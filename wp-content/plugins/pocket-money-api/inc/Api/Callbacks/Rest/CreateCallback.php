<?php

/**
 * Called during create new job post.
 *
 * This class defines all code necessary to create a new job post.
 *
 * @since      1.0.0
 * @package    PMApiPlugin
 * @subpackage PMApiPlugin/Api/Callbacks/Rest
 * @author     Md Mahbub Alam Khan <hkhan.cse@gmail.com>
 */

namespace Inc\Api\Callbacks\Rest;

use \WP_Query;
use Inc\Api\EmailApi;
use Inc\Base\BaseController;

class CreateCallback extends BaseController

{

  public $emailApi;
  public $metaFields;
  public $newPostId;
  public $first_name;
  public $email;

  // Create Job Post.

  public function pmCreateJob($data)
  {

    $allowed = $this->allowed_domains;

    $output = array(
      'status' => 0
    );

    $request_address = strpos($_SERVER['HTTP_ORIGIN'], 'localhost') ? $_SERVER['HTTP_ORIGIN'] : $_SERVER['HTTP_ORIGIN'];

    if (isset($request_address) && in_array($request_address, $allowed)) {

      $this->metaFields = [
        'first_name' => 'firstName', // key=meta_key in database, value=ajax_request_key
        'last_name' => 'lastName',
        'contact' => 'contact',
        'email' => 'email',
        'address' => 'address',
        'city' => 'city',
        'task_day' => 'taskDay',
        'duration' => 'taskDuration',
        'price' => 'taskPrice',
      ];

      $post_data = array(
        'post_type' => $this->cpt_jobs,
        'post_title' => sanitize_text_field($data->get_param('taskTitle')),
        'post_content' => sanitize_text_field($data->get_param('taskDetails')),
        'post_status' => 'publish'
      );

      $this->newPostId = wp_insert_post($post_data);

      if (!is_wp_error($this->newPostId)) {

        $this->first_name = sanitize_text_field($data->get_param('firstName'));
        $this->email = sanitize_text_field($data->get_param('email'));

        foreach ($this->metaFields as $meta_key => $req_param) {
          update_field($meta_key, sanitize_text_field($data->get_param($req_param)), $this->newPostId);
        }

        // set category.

        $job_cat_taxonomy = "category";
        $job_category = get_term_by('id', $data->get_param('taskCategory'), $job_cat_taxonomy);
        wp_set_object_terms($this->newPostId, $job_category->slug, $job_cat_taxonomy, true);

        $output = array(
          'status' => 1,
          'msg' => 'New post created.'
        );

        $this->sendJobCreateEmail();
      } else {

        $output = array(
          'status' => 0,
          'msg' => 'Unable to create post.'
        );
      }
    } else {

      array_push($output, array(
        'alsd' =>  $_SERVER['HTTP_ORIGIN'],
        'msg' => 'Unauthorized to create post.'
      ));

      return $output;
    }

    return $output;
  }

  private function sendJobCreateEmail()
  {

    $this->emailApi = new EmailApi();

    $email_settings = [[
      'to' => trim($this->email), // the recipient.
      'subject' => 'New Job Created', // email body
      'body' =>  $this->getEmailTemplate() // email body
    ]];

    $this->emailApi->addEmail($email_settings)->register();
  }

  private function getEmailTemplate()
  {

    $editLink = "$this->app_url/job/edit/$this->newPostId";
    $jobLink = "$this->app_url/job/$this->newPostId";
    return "<p>Hello $this->first_name,</p><p>Congratulations! </p><p>Your submitted <a href='$jobLink'>job post</a> published succesfully. <br>To edit/delete the job details, you can use this <a href='$editLink'>link</a>.<br>Thank you!</p>";
  }
}