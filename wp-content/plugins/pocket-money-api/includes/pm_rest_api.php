<?php

add_action('rest_api_init', 'pm_custom_rest_api');

function pm_custom_rest_api()
{
  add_action('rest_pre_serve_request', function () {
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language', true);
    header("Access-Control-Allow-Origin: *");
  });
  // Register custom routes.

  // url: /pmapi/v1/search
  // gg/v1 = unique name is gg and v1 is version.

  register_rest_route('pmapi/v1', 'search', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'pmJobSearch'
  ));

  //Create A New Data
  register_rest_route('pmapi/v1', 'create', array(
    'methods' => 'POST',
    'callback' => 'pmCreateJob'
  ));

  register_rest_route('pmapi/v1', 'jobs', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'pmAllJobs'
  ));


  function pmJobSearch($data)
  {


    echo "<pre>";
    print_r($data);
    echo "</pre>";

    die();

    // http://localhost/gamification/wp-json/pmapi/v1/search
    $args = [
      'post_type' => 'jobs',
      'posts_per_page' => -1,
      'orderby' => 'date',
      'order' => 'desc',
      // 's' => sanitize_text_field($data['term'])
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

      $category = get_the_terms($post_id, 'category');
      $category = join(', ', wp_list_pluck($category, 'name'));

      $price = get_field('price', $post_id);

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
        'excerpt' => get_the_excerpt(),
        'category' => $category,
        'price' => $price,


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

  function pmAllJobs($data)
  {

    // http://localhost/gamification/wp-json/pmapi/v1/search
    $args = [
      'post_type' => 'jobs',
      'posts_per_page' => -1,
      'orderby' => 'date',
      'order' => 'desc',
      // 's' => sanitize_text_field($data['term'])
      // 's' => '12'
    ];

    $jobs = new WP_Query($args);
    $result = $jobs;

    $jobs_data = [];

    while ($result->have_posts()) {

      $result->the_post();

      $post_id = get_the_ID();

      $category = get_the_terms($post_id, 'category');
      $category = join(', ', wp_list_pluck($category, 'name'));

      $price = get_field('price', $post_id);

      array_push($jobs_data, array(
        'id' => $post_id,
        'title' => get_the_title(),
        'excerpt' => get_the_excerpt(),
        'category' => $category,
        'price' => $price,
        'date' => get_the_date()
      ));
    }


    return $jobs_data;
  }

  function pmCreateJob($data)
  {

    // echo $_SERVER['HTTP_ORIGIN'];
    $allowed = array('http://localhost:9000', 'http://localhost:3000', 'http://localhost', 'https://webpages.tuni.fi');

    $output = array(
      'status' => 0
    );

    $request_address = 'http://' . $_SERVER['SERVER_NAME'] . ':9000';

    if (isset($request_address) && in_array($request_address, $allowed)) {

      $post_data = array(
        'post_type' => 'jobs',
        'post_title' => 'Hello',
        // 'post_title' => "gg_spin_" . sanitize_text_field($data->get_param('game_id')),
        'post_status' => 'publish'
      );

      // $post_data['meta_input'] = [
      //   'user_id' => sanitize_text_field($data->get_param('user_id')),
      //   'game_id' => sanitize_text_field($data->get_param('game_id')),
      //   'user_res' => sanitize_text_field($data->get_param('user_res')),
      //   'bot_res' => sanitize_text_field($data->get_param('bot_res')),
      //   'played_at' => sanitize_text_field($data->get_param('played_at')),
      //   'game_type_id' => sanitize_text_field($data->get_param('game_type_id')),
      // ];

      $new_post_id = wp_insert_post($post_data);

      if (!is_wp_error($new_post_id)) {
        // $output['data'] = get_post( $new_post_id ) ;	

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