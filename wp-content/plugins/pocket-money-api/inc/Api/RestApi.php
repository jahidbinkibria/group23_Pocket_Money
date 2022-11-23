<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Api;

use \Inc\Base\BaseController;

// PmApi's interface class.

class RestApi extends BaseController

{

  public $api_settings = [];

  public function register()
  {
    if (!empty($this->api_settings)) {
      add_action('rest_api_init', [$this, 'addCustomRestApi']);
      add_action('rest_pre_serve_request', [$this, 'addRestApiAuthorization']);
    }
  }

  public function addApis(array $api_settings)
  {
    $this->api_settings = $api_settings;
    return $this;
  }

  public function addRestApiAuthorization()
  {
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language', true);
    header("Access-Control-Allow-Origin: *");
  }

  public function addCustomRestApi()
  {
    foreach ($this->api_settings as $api) {
      register_rest_route($this->api_version, $api['tag'], array(
        'methods' => $api['method'],
        'callback' => $api['callback'],
        'permission_callback' => '__return_true'
      ));
    }
  }
}