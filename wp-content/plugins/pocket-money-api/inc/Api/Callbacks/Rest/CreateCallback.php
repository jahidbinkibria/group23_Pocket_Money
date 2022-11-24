<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use Inc\Base\Helper;
use \WP_Query;

class CreateCallback extends BaseController

{

  // Create Job Post.

  public function pmCreateJob($data)
  {

    // echo $_SERVER['HTTP_ORIGIN'];
    $allowed = $this->allowed_domains;

    $output = array(
      'status' => 0
    );

    $request_address = strpos($_SERVER['HTTP_ORIGIN'], 'localhost') ? $_SERVER['HTTP_ORIGIN'] : $_SERVER['HTTP_ORIGIN'];

    if (isset($request_address) && in_array($request_address, $allowed)) {

      $post_data = array(
        'post_type' => $this->cpt_jobs,
        'post_title' => sanitize_text_field($data->get_param('taskTitle')),
        'post_content' => sanitize_text_field($data->get_param('taskDetails')),
        'post_status' => 'publish'
      );

      $new_post_id = wp_insert_post($post_data);

      if (!is_wp_error($new_post_id)) {
        // $output['data'] = get_post( $new_post_id ) ;	


        update_field('first_name', sanitize_text_field($data->get_param('firstName')), $new_post_id);
        update_field('last_name', sanitize_text_field($data->get_param('lastName')), $new_post_id);
        update_field('contact', sanitize_text_field($data->get_param('contact')), $new_post_id);
        update_field('email', sanitize_text_field($data->get_param('email')), $new_post_id);
        update_field('address', sanitize_text_field($data->get_param('address')), $new_post_id);
        update_field('city', sanitize_text_field($data->get_param('city')), $new_post_id);
        update_field('task_day', sanitize_text_field($data->get_param('taskDay')), $new_post_id);
        update_field('duration', sanitize_text_field($data->get_param('taskDuration')), $new_post_id);
        update_field('price', sanitize_text_field($data->get_param('taskPrice')), $new_post_id);


        // set category.

        $job_cat_taxonomy = "category";
        $job_category = get_term_by('id', $data->get_param('taskCategory'), $job_cat_taxonomy);
        wp_set_object_terms($new_post_id, $job_category->slug, $job_cat_taxonomy, true);

        $output = array(
          'status' => 1,
          'msg' => 'New post created.'
        );

        Helper::SendEmail($data->get_param('email'), $new_post_id);
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
}