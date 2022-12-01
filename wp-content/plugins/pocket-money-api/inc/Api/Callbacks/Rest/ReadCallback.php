<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Ramsey\Uuid\Uuid;
use \WP_Query;
use Inc\Base\BaseController;
use Inc\Base\Helper;

class ReadCallback extends BaseController
{

  // Get All Jobs.

  public function pmAllJobs($data)
  {


    $jobs_data = [];

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
      $jobs_data['cat_name'] = $catObj->name;
    }

    $jobs = new WP_Query($args);

    $totalJobs = $jobs->found_posts;

    if ($totalJobs < 1) {

      $jobs_data['job_data']['status'] = false;
      return $jobs_data;
    }

    $jobs_data['max_pages'] = $jobs->max_num_pages;
    $jobs_data['job_data'] = [];

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $post_id = get_the_ID();

      $duration = get_field('duration', $post_id) ?: 0;
      $city = get_field('city', $post_id);
      $price = get_field('price', $post_id);
      $dateFormat = $this->jobDateFormat;

      $jobInfo = [
        'uuid' => get_post_meta($post_id, $this->jobHashTag, true),
        'title' => trim(get_the_title()),
        'duration' => $duration,
        'city' => $city,
        'price' => trim($price),
        'date' => get_the_date($dateFormat)
      ];

      array_push($jobs_data['job_data'], $jobInfo);
    }
    $jobs_data['status'] = true;
    return $jobs_data;
  }

  public function singleJob($data)
  {

    $jobs_data = [];
    $singlePost = $data['p_id'] ?? false; // if data['p_id'] value set then we are going to use that value other wise value is 0.

    if ($singlePost == false) {
      $jobs_data['job_data']['status'] = false;
      return $jobs_data;
    }

    // http://yourdomain.com/wp-json/pmapi/v1/job?p_id=0c68a6f4-09fb-4f68-bc45-bd2552cc3e88

    $args = [
      'post_status' => 'publish',
      'post_type' => $this->cpt_jobs,
      'posts_per_page' => 1,
      'p' => Helper::getJobIdByJobHash($singlePost)
    ];

    $jobs = new WP_Query($args);

    $jobs_data['job_data'] = [];

    while ($jobs->have_posts()) {

      $jobs->the_post();

      $post_id = get_the_ID();

      $duration = get_field('duration', $post_id) ?: 0;
      $city = get_field('city', $post_id);
      $price = get_field('price', $post_id);
      $dateFormat = $this->jobDateFormat;

      $jobInfo = [
        'uuid' => get_post_meta($post_id, $this->jobHashTag, true),
        'title' => trim(get_the_title()),
        'duration' => $duration,
        'city' => $city,
        'price' => trim($price),
        'date' => get_the_date($dateFormat)
      ];


      $category = get_the_terms($post_id, 'category');
      // echo "<pre>";
      // print_r($category);
      // echo "</pre>";
      // echo "<pre>";
      // print_r($category);
      // echo "</pre>";
      // $category = join(', ', wp_list_pluck($category, 'name'));

      $first_name = get_field('first_name', $post_id);
      $last_name = get_field('last_name', $post_id);
      $email = get_field('email', $post_id);
      $contact = get_field('contact', $post_id);
      $address = get_field('address', $post_id);

      $jobInfo['excerpt'] = get_the_content();

      $jobInfo['first_name'] = trim($first_name);
      $jobInfo['last_name'] = trim($last_name);
      $jobInfo['email'] = trim($email);
      $jobInfo['contact'] = trim($contact);
      $jobInfo['address'] = trim($address);
      if (!empty($category)) {
        $jobInfo['category'] = $category[0]->name;
        $jobInfo['cat_slug'] = $category[0]->slug;
      }
      array_push($jobs_data['job_data'], $jobInfo);
    }
    $jobs_data['status'] = true;
    return $jobs_data;
  }
}