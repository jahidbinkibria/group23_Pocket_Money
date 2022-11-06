<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Pages;

use Inc\Api\RestApi;
use \Inc\Base\BaseController;
use \Inc\Api\Callbacks\RestApiCallbacks;

class PmApi extends BaseController
{

  public $pm_apis;

  public $callbacks;

  public function register()
  {
    $this->callbacks = new RestApiCallbacks();
    $this->pm_apis = new RestApi();
    $apis = [
      [
        'tag' => 'search',
        'callback_args' => array(
          'methods' => \WP_REST_SERVER::READABLE,
          'callback' => [$this->callbacks, 'pmJobSearch']
        )
      ],
      [
        'tag' => 'create',
        'callback_args' => array(
          'methods' => 'POST',
          'callback' => [$this->callbacks, 'pmCreateJob']
        )
      ],
      [
        'tag' => 'jobs',
        'callback_args' => array(
          'methods' => \WP_REST_SERVER::READABLE,
          'callback' => [$this->callbacks, 'pmAllJobs']
        )
      ]
    ];

    $this->pm_apis->addApis($apis)->register();
  }
}