<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Ramsey\Uuid\Uuid;
use \WP_Query;
use Inc\Base\BaseController;

class ReadCallback extends BaseController
{

  // Get All Jobs.

  private function updateUUID()
  {

    $args = [
      'post_status' => 'publish',
      'post_type' => 'jobs',
      'posts_per_page' => -1
    ];

    $jobs = new WP_Query($args);

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $post_id = get_the_ID();

      $jobID = get_post_meta($post_id, 'jobId');

      if (empty($jobID)) {
        update_post_meta($post_id, 'jobId', Uuid::uuid4()->toString());
      }
    }
  }

  public function pmAllJobs($data)
  {

    if (get_option('pmJobIdUpdate') != 1) {
      $this->updateUUID();
      update_option('pmJobIdUpdate', 1);
    }

    $jobs_data = [];
    $singlePost = $data['p_id'] ?? false; // if data['p_id'] value set then we are going to use that value other wise value is 0.

    // http://yourdomain.com/wp-json/pmapi/v1/jobs
    $args = [
      'post_status' => 'publish',
      'post_type' => 'jobs',
      'posts_per_page' => $data['limit'] ?: 3,
      'paged' => $data['page'] ?: 1,
      'orderby' => $data['orderby'] ?: 'date',
      'order' => $data['order'] ?: 'DESC'
      // 's' => sanitize_text_field($data['term'])
      // 's' => '12'
    ];

    if ($singlePost) {

      // Fetch Post ID By JobId.

      global $wpdb;
      $results = $wpdb->get_results("select post_id from " . $wpdb->prefix . "postmeta where meta_value = '$singlePost'", ARRAY_A);

      $args['p'] = $results[0]['post_id'] ?? 0;
      if ($args['p'] == 0) {
        $jobs_data['job_data']['status'] = false;
        return $jobs_data;
      }
    }

    $jobs = new WP_Query($args);

    $jobs_data['max_pages'] = $jobs->max_num_pages;
    $jobs_data['job_data'] = [];

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $post_id = get_the_ID();

      $duration = get_field('duration', $post_id) ?: 0;
      $city = get_field('city', $post_id);
      $price = get_field('price', $post_id);
      $dateFormat = "d.m.Y";

      $jobInfo = [
        'uuid' => get_post_meta($post_id, 'jobId', true),
        'title' => trim(get_the_title()),
        'duration' => $duration,
        'city' => $city,
        'price' => trim($price),
        'date' => get_the_date($dateFormat)
      ];

      if ($singlePost) {

        $category = get_the_terms($post_id, 'category');
        $category = join(', ', wp_list_pluck($category, 'name'));

        $first_name = get_field('first_name', $post_id);
        $last_name = get_field('last_name', $post_id);
        $email = get_field('email', $post_id);
        $contact = get_field('contact', $post_id);
        $address = get_field('address', $post_id);

        $jobInfo['excerpt'] = get_the_content();
        $jobInfo['category'] = $category;
        $jobInfo['first_name'] = trim($first_name);
        $jobInfo['last_name'] = trim($last_name);
        $jobInfo['email'] = trim($email);
        $jobInfo['contact'] = trim($contact);
        $jobInfo['address'] = trim($address);
      }

      array_push($jobs_data['job_data'], $jobInfo);
    }
    $jobs_data['status'] = true;
    return $jobs_data;
  }
}