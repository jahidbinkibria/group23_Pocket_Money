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
    }
  }

  public function addApis(array $api_settings)
  {
    $this->api_settings = $api_settings;
    return $this;
  }

  public function addCustomRestApi()
  {

    add_action('rest_pre_serve_request', function () {
      header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language', true);
      header("Access-Control-Allow-Origin: *");
    });

    // die();
    //  tag, callback_args
    foreach ($this->api_settings as $api) {

      register_rest_route($this->api_version, $api['tag'], $api['callback_args']);
      // register_rest_route('pmapi/v1', 'search', array(
      //   'methods' => \WP_REST_SERVER::READABLE,
      //   'callback' => 'pmJobSearch'
      // ));
    }
  }
}