<?php

function gg_spin_report_page_styles() {
  wp_enqueue_style('gg-spin-report-style', GG_SPIN_API_PLUGIN_DIR . 'admin/assets/css/admin.css', array(), GG_SPIN_API_Addon::VERSION);
  wp_enqueue_script('gg-spin-report-script', GG_SPIN_API_PLUGIN_DIR . 'admin/assets/js/admin.js', '', GG_SPIN_API_Addon::VERSION, true);
}

function gg_spin_report_submenu() {

  $page = add_submenu_page(
          'edit.php?post_type=gg_spin', // unique slug for plugin settings menu.
          esc_html__('Spin Game Report', 'gg_spin'), // The Text to be display in bte browser bar.
          esc_html__('Download Report', 'gg_spin'), // The Text to be display in bte browser bar.
          'manage_options', // Permission.,
          'gg-spin-data-report', 
          'cb_gg_spin_report' // Settings Page,
  );   
  
  // loading specific css for the report page.
  add_action('admin_print_styles-' . $page, 'gg_spin_report_page_styles');
}

function cb_gg_spin_report() {

  // load voting report view page.
   require_once ( __DIR__ . '/views/view-game-report.php');
  
}

function gg_spin_report_generate_csv() {

  if (isset($_POST['_wpnonce-gg-spin-data-export'])) {
  
      check_admin_referer('gg-spin-data-export', '_wpnonce-gg-spin-data-export');

      $gg_spin_filtered_data = array();

      $game_id_status  = (isset($_POST['game_id']) && $_POST['game_id'] == 1) ? 1 : 0;
      $game_type_status  = (isset($_POST['game_type']) && $_POST['game_type'] == 1) ? 1 : 0;
      $user_id_status  = (isset($_POST['user_id']) && $_POST['user_id'] == 1) ? 1 : 0;
      $user_res_status  = (isset($_POST['user_res']) && $_POST['user_res'] == 1) ? 1 : 0;
      $bot_res_status  = (isset($_POST['bot_res']) && $_POST['bot_res'] == 1) ? 1 : 0;
      $winner_status  = (isset($_POST['winner']) && $_POST['winner'] == 1) ? 1 : 0;
      $discount_status  = (isset($_POST['discount']) && $_POST['discount'] == 1) ? 1 : 0;
      $played_at_status  = (isset($_POST['played_at']) && $_POST['played_at'] == 1) ? 1 : 0;

      // Heading of CSV file.
      $gg_spin_heading = array();

      if($game_id_status) {
        $gg_spin_heading[] = 'Game ID';
      }

      if($game_type_status) {
        $gg_spin_heading[] = 'Game TYpe';
      }

      if($user_id_status) {
        $gg_spin_heading[] = 'User ID';
      }
      if($user_res_status) {
        $gg_spin_heading[] = 'User Result';
      }
      if($bot_res_status) {
        $gg_spin_heading[] = 'Bot Result';
      }

      if($discount_status) {
        $gg_spin_heading[] = 'Discount';
      }

      if($winner_status) {
        $gg_spin_heading[] = 'Winner';
      }
      if($played_at_status) {
        $gg_spin_heading[] = 'Played At';
      }


      array_push($gg_spin_filtered_data, $gg_spin_heading);

      $args = array(
        'post_type'  => GG_SPIN_CPT_TAG,     
        'orderby' => 'ID',
        'order'     => 'DESC',
        'posts_per_page'      => -1,                
        'post_status'       => 'publish'
      );


      $args['meta_query']= array('relation' => 'OR');


      if( ( isset($_POST['filter_game_type_id']) && $_POST['filter_game_type_id'] != "" ) ) {
        array_push($args['meta_query'], array(
          'key'     => 'game_type_id',
          'value'   => $_POST['filter_game_type_id'],
          'compare' => '=',
        ));

      }

      // if( ! empty(  $args['meta_query'])) {

      //   $args['meta_query'][]

      // }

      // echo "<pre>";
      // print_r($args);
      // echo "</pre>";

      // $args['meta_query'] = array(
      //         'relation' => 'AND', // or
      //         array(
      //             'key'     => 'game_type_id',
      //             'value'   => "0",
      //             'compare' => '=',
      //         )
      //         // array(
      //         //     'key'     => 'color',
      //         //     'value'   => 'blue',
      //         //     'compare' => 'NOT LIKE',
      //         // ),
      //         // array(
      //         //     'key' => 'price',
      //         //     'value'   => array( 20, 100 ),
      //         //     'type'    => 'numeric',
      //         //     'compare' => 'BETWEEN',
      //         // ),
      //         );


      // meta query.

      $loop = new WP_Query($args);

      $filter_result_type = ( isset($_POST['filter_result_type']) && $_POST['filter_result_type'] != "" ) ? $_POST['filter_result_type'] : "" ; // 0=lose, 1=win, 2 = tie, 3 = not played      

      if ( $loop->have_posts() ) :

      while ( $loop->have_posts() ) :

          $loop->the_post();

          $postID = get_the_ID();

          $game_id = get_the_title();

          $user_id = get_post_meta( $postID, 'user_id', true );

          $game_type_id = get_post_meta( $postID, 'game_type_id', true );

          $user_res = get_post_meta( $postID, 'user_res', true );

          $bot_res = get_post_meta( $postID, 'bot_res', true );

          $winner = GG_SPIN_PLAYER_1_TITLE;

          $discount = '-';
              
          if($user_res ==0 && $bot_res == 0 ) {
            $winner = "Not played.";
            $result_type = 3;
          } else if($user_res > $bot_res) {
            $winner = GG_SPIN_PLAYER_1_TITLE;
            $discount = gg_spain_calculate_discount($user_res, $bot_res, $game_type_id). "%";
            $result_type = 1;
          } else if($user_res < $bot_res) {
            $winner = GG_SPIN_PLAYER_2_TITLE;
            $discount = gg_spain_calculate_discount($user_res, $bot_res, $game_type_id). "%";
            $result_type = 0;
          } else {
            $winner = "Tie";
            $result_type = 2;
          }

          $gg_spin_played_at  = get_post_meta( $postID, 'played_at', true );

          // Single Game Data.

          $gg_spin_single_data = array();

          if($game_id_status) {
            
            $gg_spin_single_data[] = $game_id;
          }

          if($game_type_status) { 
            $game_type_id = ($game_type_id!="") ? $game_type_id : 0;
            $game_type_info = gg_spin_game_type($game_type_id);
            // echo '#'.$game_type_id .' (' .$game_type_info['title'] .')';

            $gg_spin_single_data[] =  '#'.$game_type_id .' (' .$game_type_info['title'] .')';
          }

          if($user_id_status) {
            $gg_spin_single_data[] = $user_id;
          }
          if($user_res_status) {
            $gg_spin_single_data[] = $user_res;
          }
          if($bot_res_status) {
            $gg_spin_single_data[] = $bot_res;
          }

          if($discount_status) {
            $gg_spin_single_data[] = $discount;
          }

          if($winner_status) {
            $gg_spin_single_data[] = $winner;
          }
          if($played_at_status) {
            $gg_spin_single_data[] = $gg_spin_played_at;
          }

          
          if( $filter_result_type == $result_type ) {

            array_push($gg_spin_filtered_data, $gg_spin_single_data);

          }


      endwhile;

      endif;


      // echo "<pre>";
      // print_r($gg_spin_filtered_data);
      // echo "</pre>";
      // die();


      $output_file_name = 'spin_data.' . date('Y-m-d-H-i-s') . '.csv';

      header('Content-Description: File Transfer');
      header('Content-Disposition: attachment; filename=' . $output_file_name);
      header('Content-Type: text/csv; charset=' . get_option('blog_charset'), true);


      $input_array = $gg_spin_filtered_data;
        
      $delimiter = ',';

      /** open raw memory as file, no need for temp files, be careful not to run out of memory thought */
      $f = fopen('php://memory', 'w');
      /** loop through array  */
      foreach ($input_array as $line) {
        /** default php csv handler **/
        fputcsv($f, $line, $delimiter);
      }
      /** rewrind the "file" with the csv lines **/
      fseek($f, 0);
      /** modify header to be downloadable csv file **/
      header('Content-Type: application/csv');
      header('Content-Disposition: attachement; filename="' . $output_file_name . '";');
      /** Send file to browser for download */
      fpassthru($f);
      exit;


        }

      }