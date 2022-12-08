<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use Inc\Base\Helpers;
use \WP_Query;

class EditCallback extends BaseController
{

  // Edit Job Post.  

  public function pmEditJob($data)
  {
    $jobInfo = Helpers::checkJobInfo($data);
    return $this->editTheJob($jobInfo, $data);
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

      // Update post(job) basic information.
      $updatedJobData = array(
        'ID'           => $jobId,
        'post_title' => $data->get_param('taskTitle'),
        'post_content' => $data->get_param('taskDetails') ?? '',

      );
      wp_update_post($updatedJobData);

      // Update post(job) category.
      $job_cat_taxonomy = "category";
      $job_category = get_term_by('id', $data->get_param('taskCategory'), $job_cat_taxonomy);
      wp_set_object_terms($jobId, $job_category->slug, $job_cat_taxonomy, true);

      // Update meta fields information.
      $metaFields = [
        'taskPrice' => 'taskPrice',
        'task_day' => 'taskDay',
        'duration' => 'taskDuration',
        'price' => 'taskPrice',
        'city' => 'city',
      ];

      foreach ($metaFields as $key => $value) {
        update_post_meta($jobId, $key, $data->get_param($value));
      }

      //Finally send response.
      $response['status'] = 1;
      $response['msg'] =  'Job info updated!';
      return $response;
    }
  }
}