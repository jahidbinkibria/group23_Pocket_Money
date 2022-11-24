<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

use Inc\Base\BaseController;

class Helper
{
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