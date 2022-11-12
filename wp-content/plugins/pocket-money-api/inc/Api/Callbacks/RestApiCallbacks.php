<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks;

use Inc\Base\BaseController;
use \WP_Query;

class RestApiCallbacks extends BaseController

{

  // Job Search CallBack.

  public function pmJobSearch($data)
  {

    // wp-json/pmapi/v1/search?s=baby&cat=11

    // echo "<pre>";
    // print_r($data['s']);
    // print_r($data['cat']);
    // echo "</pre>";

    // die();

    // http://yourdomain.com/wp-json/pmapi/v1/search
    $args = [
      'post_type' => 'jobs',
      'posts_per_page' => -1,
      'orderby' => 'title',
      'order' => 'ASC',
      'posts_per_page' => 5,
      's' => sanitize_text_field($data['s'])
      // 's' => '12'
    ];

    // $args['meta_key'] = GG_PUB_CMB_PREFIX . 'year';
    // $args['orderby'] = "meta_value_num";

    // $args['tax_query']              = array(
    //   'relation' => 'AND'        
    // );

    // if(isset($data['docs_type'])) {

    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_DOC_TYPE, // taxonomy slug
    //     'terms'            => explode('_', $data['docs_type']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }

    // if(isset($data['year'])) {
    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_YEAR, // taxonomy slug
    //     'terms'            => explode('_', $data['year']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }


    // if(isset($data['author'])) {

    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_AUTHOR, // taxonomy slug
    //     'terms'            => explode('_', $data['author']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }

    $jobs = new WP_Query($args);
    $result = $jobs;

    $jobs_data = [];

    while ($result->have_posts()) {

      $result->the_post();

      $post_id = get_the_ID();

      // $category = get_the_terms($post_id, 'category');
      // $category = join(', ', wp_list_pluck($category, 'name'));

      // $price = get_field('price', $post_id);

      // $tax_author = pm_tax_term_as_string( get_the_terms( $post_id, GG_PUB_TAX_AUTHOR, ARRAY_A ) );                    

      // $tax_year = pm_tax_term_as_string ( get_the_terms( $post_id, GG_PUB_TAX_YEAR, ARRAY_A ) );                  

      // Post Meta.

      // $author = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'author', true);
      // $year = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'year', true);
      // $address = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'address', true);
      // $url = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'url', true);
      // $abstract = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'abstract', true);
      // $volume = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'volume', true);
      // $journal = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'journal', true);
      // $pages = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'pages', true);
      // $publisher = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'publisher', true);
      // $booktitle = cleanup_title( get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'booktitle', true) );
      // $raw_data = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'raw_data', true);


      array_push($jobs_data, array(
        'id' => $post_id,
        'title' => get_the_title(),
        // 'excerpt' => get_the_excerpt(),
        // 'category' => $category,
        // 'price' => $price,


        // 'author' => $author,
        // 'year'=> $year,
        // 'address'=> $address,
        // 'url'=> $url,
        // 'abstract'=> $abstract,
        // 'volume'=> $volume,
        // 'journal'=> $journal,
        // 'pages'=> $pages,
        // 'publisher'=> $publisher,
        // 'booktitle'=> $booktitle,
        // 'raw_data'=> $raw_data,
      ));
    }


    return $jobs_data;
  }

  // All Jobs.

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

  // Callbacks.

  public function pmCreateJob($data)
  {

    // echo $_SERVER['HTTP_ORIGIN'];
    $allowed = array('http://localhost:9000', 'http://localhost:3000', 'http://localhost', 'https://wonderful-panda-70f21b.netlify.app');

    $output = array(
      'status' => 0
    );

    $request_address = ($_SERVER['SERVER_NAME'] == "localhost") ?  'http://' . $_SERVER['SERVER_NAME'] . ':9000' :  $_SERVER['HTTP_ORIGIN'];

    if (isset($request_address) && in_array($request_address, $allowed)) {

      $post_data = array(
        'post_type' => 'jobs',
        'post_title' => sanitize_text_field($data->get_param('taskTitle')),
        'post_content' => sanitize_text_field($data->get_param('taskDetails')),
        // 'post_title' => "gg_spin_" . sanitize_text_field($data->get_param('game_id')),
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
        update_field('zip_code', sanitize_text_field($data->get_param('zipCode')), $new_post_id);
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