<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use \WP_Query;

class ReadCallback extends BaseController

{

  // Get All Jobs.

  public function pmAllJobs($data)
  {

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
      $args['p'] = $data['p_id'];
    }

    $jobs = new WP_Query($args);
    $result = $jobs;

    $jobs_data['max_pages'] = $jobs->max_num_pages;
    $jobs_data['job_data'] = [];

    while ($result->have_posts()) {

      $result->the_post();

      $post_id = get_the_ID();


      $duration = get_field('duration', $post_id) ?: 0;

      $jobInfo = [
        'id' => $post_id,
        'title' => trim(get_the_title()),
        'excerpt' => get_the_excerpt(),
        'duration' => $duration
      ];

      if ($singlePost) {

        $category = get_the_terms($post_id, 'category');
        $category = join(', ', wp_list_pluck($category, 'name'));

        $first_name = get_field('first_name', $post_id);
        $last_name = get_field('last_name', $post_id);
        $email = get_field('email', $post_id);
        $contact = get_field('contact', $post_id);
        $address = get_field('address', $post_id);
        $city = get_field('city', $post_id);
        $price = get_field('price', $post_id);

        $jobInfo['excerpt'] = get_the_content();
        $jobInfo['category'] = $category;
        $jobInfo['first_name'] = trim($first_name);
        $jobInfo['last_name'] = trim($last_name);
        $jobInfo['email'] = trim($email);
        $jobInfo['contact'] = trim($contact);
        $jobInfo['address'] = trim($address);
        $jobInfo['city'] = $city;
        $jobInfo['price'] = trim($price);
        $jobInfo['date'] = get_the_date();
      }

      array_push($jobs_data['job_data'], $jobInfo);
    }

    // echo "<pre>";
    // print_r($result);
    // echo "</pre>";



    return $jobs_data;
  }
}