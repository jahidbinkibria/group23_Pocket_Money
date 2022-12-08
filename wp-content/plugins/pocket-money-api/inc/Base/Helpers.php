<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

use Inc\Base\BaseController;

class Helpers
{

  // Get all the custom colums header 
  public static function getColumnCustomHeaders()
  {

    return [
      'ID' => esc_html__('ID', 'bwl-pro-voting-manager'),
      'jobId' => esc_html__('Job Id', 'bwl-pro-voting-manager'),
      // 'pvm_dislike_votes_count' => esc_html__('Dislike', 'bwl-pro-voting-manager'),
      // 'pvm_feedback' => esc_html__('Feedback', 'bwl-pro-voting-manager'),
      // 'bwl_pvm_display_status' => __('Voting <br /> Status', 'bwl-pro-voting-manager')
    ];
  }

  public static function getJobHashById($jobId)
  {
    $pluginInfo = new BaseController();
    $jobHash = get_post_meta($jobId, $pluginInfo->jobHashTag, true) ?? 0;
    return $jobHash;
  }

  public static function getJobIdByJobHash($hashId)
  {
    global $wpdb;
    $results = $wpdb->get_results("select post_id from " . $wpdb->prefix . "postmeta where meta_value = '$hashId'", ARRAY_A);

    $jobId = $results[0]['post_id'] ?? 0;
    return $jobId;
  }

  public static function checkJobInfo($data)
  {

    $response = [];

    $jobId = ($data->get_param('jobId')) ?? 0;

    $response['jobId'] = 0;

    if ($jobId == 0) {
      $response['msg'] = 'Job Id is required!';
      return $response;
    }

    // Check if job exists with that particular ID
    $isJobDeleted = is_null(get_post($jobId));

    if ($isJobDeleted == 1) {
      $response['msg'] = "The Job Id $jobId does not exists or was deleted!";
      return $response;
    }

    $response['jobId'] = $jobId;
    return $response;
  }

  public static function SendEmail($to, $id)
  {

    if (empty($id))
      return true;

    $pluginInfo = new BaseController();

    $pluginInfo->app_url;

    $editUrl = $pluginInfo->app_url . '/job/edit/' . $id .
      $to = 'sendto@example.com';
    $subject = "New Job Created";
    $body = "
      <div>
        Congratulations! 
        <br>

        You can edit or delete the job by using this <a href='$editUrl'>link</a>.
    
    </div>";
    $headers = array('Content-Type: text/html; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);
  }
}