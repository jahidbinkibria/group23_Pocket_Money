<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use Inc\Base\Helpers;
use \WP_Query;

class DeleteCallback extends BaseController

{

  private function deleteTheJob($jobInfo = [])
  {
    extract($jobInfo);

    $response = [
      'status' => 0,
      'jobId' => $jobId,
      'msg' => $msg
    ];

    if ($jobId == 0) {
      return $response;
    } else {
      // echo $jobId;
      // Run delete query. 
      wp_delete_post($jobId);
      $response['status'] = 1;
      $response['msg'] =  'Job removed!';

      return $response;
    }
  }



  // Delete Job Post.

  public function pmDeleteJob($data)
  {
    $jobInfo = Helpers::checkJobInfo($data);

    return $this->deleteTheJob($jobInfo);
  }
}