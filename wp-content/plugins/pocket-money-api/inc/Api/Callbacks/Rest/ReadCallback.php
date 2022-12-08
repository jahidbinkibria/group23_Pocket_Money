<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use \WP_Query;
use Inc\Base\BaseController;
use Inc\Base\Helpers;

class ReadCallback extends BaseController
{

  /**
   * Get All Jobs.
   * Request: wp-json/pmapi/v1/jobs
   */

  public function pmAllJobs($data)
  {

    $jobsData = [];

    // http://yourdomain.com/wp-json/pmapi/v1/jobs
    $args = [
      'post_status' => 'publish',
      'post_type' => $this->cpt_jobs,
      'posts_per_page' => $data['limit'] ?: 3,
      'paged' => $data['page'] ?: 1,
      'orderby' => $data['orderby'] ?: 'date',
      'order' => $data['order'] ?: 'DESC'
    ];

    if (isset($data['catslug']) && !empty($data['catslug'])) {
      // die();
      $args['tax_query']  = array(                     //(array) - use taxonomy parameters (available with Version 3.1).
        'relation' => 'AND',                      //(string) - Possible values are 'AND' or 'OR' and is the equivalent of ruuning a JOIN for each taxonomy
        array(
          'taxonomy' => 'category',                //(string) - Taxonomy.
          'field' => 'slug',                    //(string) - Select taxonomy term by ('id' or 'slug')
          'terms' => $data['catslug'],    //(int/string/array) - Taxonomy term(s).
          'include_children' => 0,           //(bool) - Whether or not to include children for hierarchical taxonomies. Defaults to true.
          'operator' => 'IN'                    //(string) - Operator to test. Possible values are 'IN', 'NOT IN', 'AND'.
        )
      );

      $catObj = get_category_by_slug($data['catslug']);
      $jobsData['cat_name'] = $catObj->name;
    }

    $jobs = new WP_Query($args);

    $totalJobs = $jobs->found_posts;

    if ($totalJobs < 1) {

      $jobsData['job_data']['status'] = false;
      return $jobsData;
    }

    $jobsData['max_pages'] = $jobs->max_num_pages;
    $jobsData['job_data'] = [];

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $postId = get_the_ID();

      $duration = get_field('duration', $postId) ?: 0;
      $city = get_field('city', $postId);
      $price = get_field('price', $postId);
      $jobDate = date("d.m.Y", strtotime(get_field('task_day', $postId)));

      $jobInfo = [
        'uuid' => get_post_meta($postId, $this->jobHashTag, true),
        'title' => trim(get_the_title()),
        'duration' => $duration,
        'city' => $city,
        'price' => trim($price),
        'date' => $jobDate
      ];

      array_push($jobsData['job_data'], $jobInfo);
    }
    $jobsData['status'] = true;
    return $jobsData;
  }


  /**
   * Get Single Job.
   * Request: wp-json/pmapi/v1/job?p_id=0c68a6f4-09fb-4f68-bc45-bd2552cc3e88
   */

  public function singleJob($data)
  {

    $jobData = [];
    $singlePost = $data['p_id'] ?? false; // if data['p_id'] value set then we are going to use that value other wise value is 0.

    if ($singlePost == false) {
      $jobData['job_data']['status'] = false;
      return $jobData;
    }


    $args = [
      'post_status' => 'publish',
      'post_type' => $this->cpt_jobs,
      'posts_per_page' => 1,
      'p' => Helpers::getJobIdByJobHash($singlePost)
    ];

    $jobs = new WP_Query($args);

    $jobData['job_data'] = [];

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $postId = get_the_ID();

      $duration = get_field('duration', $postId) ?: 0;
      $city = get_field('city', $postId);
      $price = get_field('price', $postId);
      $jobDate = date("d.m.Y", strtotime(get_field('task_day', $postId)));

      $jobInfo = [
        // 'id' => $postId,
        'uuid' => get_post_meta($postId, $this->jobHashTag, true),
        'title' => trim(get_the_title()),
        'duration' => $duration,
        'city' => $city,
        'price' => trim($price),
        'date' => $jobDate
      ];


      $category = get_the_terms($postId, 'category');
      // echo "<pre>";
      // print_r($category);
      // echo "</pre>";
      // echo "<pre>";
      // print_r($category);
      // echo "</pre>";
      // $category = join(', ', wp_list_pluck($category, 'name'));

      $first_name = get_field('first_name', $postId);
      $last_name = get_field('last_name', $postId);
      $email = get_field('email', $postId);
      $contact = get_field('contact', $postId);
      $address = get_field('address', $postId);

      $jobInfo['nonce'] = wp_create_nonce('wp_rest');
      $jobInfo['excerpt'] = get_the_content();

      $jobInfo['first_name'] = trim($first_name);
      $jobInfo['last_name'] = trim($last_name);
      $jobInfo['email'] = trim($email);
      $jobInfo['contact'] = trim($contact);
      $jobInfo['address'] = trim($address);
      if (!empty($category)) {
        $jobInfo['category'] = $category[0]->name;
        $jobInfo['cat_slug'] = $category[0]->slug;
        $jobInfo['cat_id'] = $category[0]->term_id;
      }
      array_push($jobData['job_data'], $jobInfo);
    }
    $jobData['status'] = true;
    return $jobData;
  }

  public function jobCategories()
  {
    $categories = [
      '3' => 'Care Giving',
      '4' => 'Parcel Delivery',
      '5' => 'Repair',
    ];

    $data['categories'] = $categories;
    $data['status'] = true;

    return $data;
  }
}