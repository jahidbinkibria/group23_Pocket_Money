<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Pages;

use Inc\Api\RestApi;
use \Inc\Base\BaseController;
use \Inc\Api\Callbacks\Rest\EditCallback;
use \Inc\Api\Callbacks\Rest\ReadCallback;
use \Inc\Api\Callbacks\Rest\DeleteCallback;
use \Inc\Api\Callbacks\Rest\SearchCallback;
use \Inc\Api\Callbacks\Rest\CreateCallback;


class PmApi extends BaseController
{

  public $pm_apis;

  public $cb_search; // search for a job post.
  public $cb_create; // create a job post.
  public $cb_read; // read all the jobs.
  public $cb_edit; // edit a job post.
  public $cb_delete; // delete a job post.

  public function register()
  {

    $this->cb_search = new SearchCallback();
    $this->cb_create = new CreateCallback();
    $this->cb_read = new ReadCallback();
    $this->cb_edit = new EditCallback();
    $this->cb_delete = new DeleteCallback();
    $this->pm_apis = new RestApi();
    $apis = [
      [
        'tag' => 'search',
        'method' => \WP_REST_SERVER::READABLE,
        'callback' => [$this->cb_search, 'pmJobSearch']
      ], // wp-json/pmapi/v1/search
      [
        'tag' => 'create',
        'method' => \WP_REST_SERVER::CREATABLE,
        'callback' => [$this->cb_create, 'pmCreateJob']
      ], //wp-json/pmapi/v1/create
      [
        'tag' => 'jobs',
        'method' => \WP_REST_SERVER::READABLE,
        'callback' => [$this->cb_read, 'pmAllJobs']
      ], //wp-json/pmapi/v1/jobs
      [
        'tag' => 'job',
        'method' => \WP_REST_SERVER::READABLE,
        'callback' => [$this->cb_read, 'singleJob']
      ], //wp-json/pmapi/v1/job/
      [
        'tag' => 'edit',
        'method' => \WP_REST_SERVER::EDITABLE,
        'callback' => [$this->cb_edit, 'pmEditJob']
      ], // wp-json/pmapi/v1/edit
      [
        'tag' => 'delete',
        'method' => \WP_REST_SERVER::DELETABLE,
        'callback' => [$this->cb_delete, 'pmDeleteJob']
      ] //wp-json/pmapi/v1/delete
    ];

    $this->pm_apis->addApis($apis)->register();
  }
}