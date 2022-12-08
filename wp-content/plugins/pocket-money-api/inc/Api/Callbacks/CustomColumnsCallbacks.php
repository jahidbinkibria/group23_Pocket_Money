<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks;

use Inc\Base\Helpers;
use Inc\Base\BaseController;

class CustomColumnsCallbacks extends BaseController
{

  function columnHeader($columns)
  {

    return array_merge(
      $columns,
      Helpers::getColumnCustomHeaders()
    );
  }

  // Display Custom Columns Data For Voting Manager Plugin.

  function columnData($column)
  {

    global $post;

    switch ($column) {

      case 'jobId':

        $jobId = (get_post_meta($post->ID, "jobId", true) == "") ? 0 : get_post_meta($post->ID, "jobId", true);
        echo '<div id="pvm_like_votes_count-' . $post->ID . '" >' . $jobId . '</div>';

        break;

      case 'ID':

        echo '<div id="post-id-' . $post->ID . '">' . $post->ID . '</div>';

        break;

      case 'bwl_pvm_display_status':

        $bwl_pvm_display_status = (get_post_meta($post->ID, "bwl_pvm_display_status", true) == "") ? 1 : get_post_meta($post->ID, "bwl_pvm_display_status", true);

        if ($bwl_pvm_display_status == 4) {

          $bwl_pvm_display_status_text = esc_html__('Date Range', 'bwl-pro-voting-manager');
        } else if ($bwl_pvm_display_status == 3) {

          $bwl_pvm_display_status_text = esc_html__('Paused', 'bwl-pro-voting-manager');
        } else if ($bwl_pvm_display_status == 2) {

          $bwl_pvm_display_status_text = esc_html__('Closed', 'bwl-pro-voting-manager');
        } else if ($bwl_pvm_display_status == 1) {

          $bwl_pvm_display_status_text = esc_html__('Show', 'bwl-pro-voting-manager');
        } else {

          $bwl_pvm_display_status_text = esc_html__('Hidden', 'bwl-pro-voting-manager');
        }

        echo '<div id="bwl_pvm_display_status-' . $post->ID . '" data-status_code="' . $bwl_pvm_display_status . '">' . $bwl_pvm_display_status_text . '</div>';

        break;

      case 'pvm_feedback':

        $pvm_feedback_message_unique_id = 'pvm_feedback_list_' . $post->ID; // so idea is we are going to add post id after vairable name

        $prev_pvm_feedback_message = get_post_meta($post->ID, $pvm_feedback_message_unique_id);


        if (isset($prev_pvm_feedback_message[0])) {

          $prev_pvm_feedback_message_counter = sizeof($prev_pvm_feedback_message[0]);
        } else {

          $prev_pvm_feedback_message_counter = 0;
        }

        echo '<div id="pvm_dislike_votes_count-' . $post->ID . '" class="pvm_alignment">' . $prev_pvm_feedback_message_counter . '</div>';

        break;
    }
  }
}