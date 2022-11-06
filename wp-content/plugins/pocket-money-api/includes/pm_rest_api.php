<?php

add_action('rest_api_init', 'pm_custom_rest_api');

function pm_custom_rest_api()
{
  add_action('rest_pre_serve_request', function () {
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language', true);
    header("Access-Control-Allow-Origin: *");
  });
  // Register custom routes.

  // url: /pmapi/v1/search
  // gg/v1 = unique name is gg and v1 is version.

  // register_rest_route('pmapi/v1', 'search', array(
  //   'methods' => WP_REST_SERVER::READABLE,
  //   'callback' => 'pmJobSearch'
  // ));

  // // url: /pmapi/v1/create
  // //Create A New Data
  // register_rest_route('pmapi/v1', 'create', array(
  //   'methods' => 'POST',
  //   'callback' => 'pmCreateJob'
  // ));

  // register_rest_route('pmapi/v1', 'jobs', array(
  //   'methods' => WP_REST_SERVER::READABLE,
  //   'callback' => 'pmAllJobs'
  // ));
}