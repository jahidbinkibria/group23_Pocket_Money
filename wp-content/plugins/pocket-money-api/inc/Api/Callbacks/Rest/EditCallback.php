<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use Inc\Base\Helper;
use \WP_Query;

class EditCallback extends BaseController

{

  // Edit Job Post.  

  public function pmEditJob($data)
  {

    $jobInfo = Helper::checkJobInfo($data);

    return $this->editTheJob($jobInfo, $data);


    // echo "<pre>Edit:";
    // print_r($data->get_param('job_id'));
    // echo "</pre>";
  }

  private function editTheJob($jobInfo = [], $data)
  {
    extract($jobInfo);
    if ($jobId == 0)
      return [
        'status' => 0,
        'jobId' => $jobId,
        'msg' => $msg
      ];

    if ($jobId == 0) {
      return $response;
    } else {

      // Run delete query. 
      $job = array();
      $job['ID'] = $jobId;
      $job['post_content'] = $data->get_param('content') ?? '';
      wp_update_post($job);

      $response['status'] = 1;
      $response['msg'] =  'Job info updated!';
      return $response;
    }
  }
}