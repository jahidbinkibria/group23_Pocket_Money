<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use \WP_Query;

class CreateCallback extends BaseController

{

  // Create Job Post.

  public function pmCreateJob($data)
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
        'post_title' => sanitize_text_field($data->get_param('taskTitle')),
        'post_content' => sanitize_text_field($data->get_param('taskDetails')),
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