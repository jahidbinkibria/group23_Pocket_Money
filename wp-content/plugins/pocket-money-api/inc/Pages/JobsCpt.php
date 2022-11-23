<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Pages;

use Inc\Api\CptApi;
use \Inc\Base\BaseController;
// use \Inc\Api\Callbacks\RestApiCallbacks;

class JobsCpt extends BaseController
{

  public $job_cpt;
  public $cpt_settings = array();

  public $callbacks;

  public function register()
  {

    $this->job_cpt = new CptApi();
    $this->cpt_settings = [
      [
        'post_type' => $this->cpt_jobs, // keep it unique
        'menu_name' => 'Jobs',
        'singular_name' => 'Job',
        'menu_icon' => 'dashicons-admin-plugins',
        'query_var' => 'jobs'
      ]
    ];

    $this->tax_settings = [
      [
        "tax_title" => "Category",
        "tax_slug" => "category"
      ]
    ];

    $this->job_cpt->addCpt($this->cpt_settings)->WithTaxonomy($this->tax_settings)->register();
  }
}