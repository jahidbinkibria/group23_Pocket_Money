<?php

// http://localhost/wheeljs_api/wp-json/pricode/v1/search?term=bias

define("GG_API_ROUTE", "ggspin/v1");

add_action('rest_api_init', 'gg_custom_rest_api');


function gg_custom_rest_api() {

  //Read all data.
  register_rest_route('ggspin/v1', '/read/', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'gg_spin_read_data'
  ));


  //Create A New Data
  register_rest_route('ggspin/v1', '/create/', array(
    'methods' => 'POST',
    'callback' => 'gg_spin_create_data'
  ));

  }
  

  function gg_spin_create_data($data) {


    $allowed = array('http://localhost:3000', 'http://localhost', 'https://webpages.tuni.fi'); 

    $output = array(
      'status' => 0
    );    

    if(isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed)){
      
      $post_data = array(
        'post_type' => GG_SPIN_CPT_TAG,
        'post_title' => "gg_spin_" . sanitize_text_field( $data->get_param( 'game_id' )),
        'post_status' => 'publish'
      ); 

      $post_data['meta_input'] = [
        'user_id' => sanitize_text_field( $data->get_param( 'user_id' )),
        'game_id' => sanitize_text_field( $data->get_param( 'game_id' )),
        'user_res' => sanitize_text_field( $data->get_param( 'user_res' )),
        'bot_res' => sanitize_text_field( $data->get_param( 'bot_res' )),
        'played_at' => sanitize_text_field( $data->get_param( 'played_at' )),
        'game_type_id' => sanitize_text_field( $data->get_param( 'game_type_id' )),
      ];

      $new_post_id = wp_insert_post( $post_data );    

      if( !is_wp_error( $new_post_id ) ){
        // $output['data'] = get_post( $new_post_id ) ;	

        $output = array(          
          'status' => 1,
          'msg' => 'New post created.'
        );

      }else{

          $output = array(
            'status' => 0,
            'msg' => 'Unable to create post.'
          );
      }


    } else {

      array_push($output, array(        
        'msg' => 'Unauthorized to create post.'
      ));

      return $output;
    }
    

    return $output;

  }

  function gg_spin_read_data($data) {

    $id = ($data['id'] && $data['id'] !="" && is_numeric($data['id'])) ? $data['id'] : 0;


    $args = array(
      'post_type' => GG_SPIN_CPT_TAG,
      'posts_per_page' => -1,
      'orderby'=> 'date',
      'order'=> 'desc',
      // 's' => sanitize_text_field($data['term'])
      // 's' => '12'
    );


    $result= new WP_Query($args);

     $output= array();

     while($result->have_posts()) {

       $result->the_post();

       $post_id = get_the_ID();

       array_push($output, array(
        'id' => $post_id,
        'title'=> get_the_title()
      ));   

     }


    return $output;

  }