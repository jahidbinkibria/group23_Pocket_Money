<?php 

function gg_spin_column_header($columns) {

  $columns = array();

  $columns['cb'] = '<input type="checkbox" />';

  $columns['title'] = __('Game ID', 'gg_spin');

  $columns['game_type_id'] = __('Game Type', 'gg_spin');

  $columns['user_id'] = __('User Id', 'gg_spin');

  $columns['user_res'] = 'Score ('.GG_SPIN_PLAYER_1_TITLE.')';

  $columns['bot_res'] = 'Score ('.GG_SPIN_PLAYER_2_TITLE.')';

  $columns['discount'] = __('Discount', 'gg_spin');

  $columns['winner'] = __('Winner', 'gg_spin');

  $columns['played_at'] = __('Played At', 'gg_spin');

  $columns['date'] = __('Date', 'gg_spin');

  return $columns;
}


function gg_spin_custom_column($column) {

  global $post;

  $postID = $post->ID;

  $prefix = GG_SPIN_CMB_PREFIX;

  $user_res = get_post_meta( $postID, 'user_res', true );

  $game_type_id = get_post_meta( $postID, 'game_type_id', true );

  $bot_res = get_post_meta( $postID, 'bot_res', true );


  $winner = GG_SPIN_PLAYER_1_TITLE;
  $discount = '-';


  if($user_res ==0 && $bot_res == 0 ) {
    $winner = "Not played.";
  } else if($user_res > $bot_res) {
    $winner = GG_SPIN_PLAYER_1_TITLE;
    $discount = gg_spain_calculate_discount($user_res, $bot_res, $game_type_id). "%";
  } else if($user_res < $bot_res) {
    $winner = GG_SPIN_PLAYER_2_TITLE;
    $discount = gg_spain_calculate_discount($user_res, $bot_res, $game_type_id). "%";
  } else {
    $winner = "Tie";
  }

  // played at.
  $gg_spin_played_at  = get_post_meta( $postID, 'played_at', true );

  switch ($column) {

        case 'user_id':
            echo get_post_meta( $postID, 'user_id', true );
        break;

        case 'game_type_id':

          if($game_type_id == "") {            
            update_post_meta( $postID, 'game_type_id', $game_type_id );
          }

          $game_type_id = ($game_type_id!="") ? $game_type_id : 0;

          $game_type_info = gg_spin_game_type($game_type_id);
          echo '#'.$game_type_id .' (' .$game_type_info['title'] .')';
      break;

        case 'user_res':
            echo $user_res;
        break;

        case 'bot_res':
            echo $bot_res;
        break;

        case 'discount':
            echo $discount;
        break;

        case 'winner':
            echo $winner;
        break;        

        case 'played_at':
            echo $gg_spin_played_at;
        break;
  
  }
}