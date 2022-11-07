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
        'method' => \WP_REST_SERVER::READABLE,
        'callback' => [$this->callbacks, 'pmJobSearch']
      ],
      [
        'tag' => 'create',
        'method' => \WP_REST_SERVER::CREATABLE,
        'callback' => [$this->callbacks, 'pmCreateJob']
      ],
      [
        'tag' => 'jobs',
        'method' => \WP_REST_SERVER::READABLE,
        'callback' => [$this->callbacks, 'pmAllJobs']
      ]
    ];

    $this->pm_apis->addApis($apis)->register();
  }
}