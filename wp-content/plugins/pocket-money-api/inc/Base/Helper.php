<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

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
}