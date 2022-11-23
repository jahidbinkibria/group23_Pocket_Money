<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Base;


class BaseController

{

  public $api_version;
  public $plugin_version;
  public $plugin_slug;
  public $plugin_path; // plugin relative url. (use for template or files.)
  public $plugin_url; // plugin absolute url (use for style)
  public $plugin; // plugin base file path.
  public $cpt_jobs;

  public $default_scripts_dependency;

  public function __construct()
  {

    $this->api_version = "pmapi/v1";
    $this->plugin_version = '1.0.1';
    $this->plugin_slug = "pmapi";
    $this->plugin_path = plugin_dir_path(dirname(__FILE__, 2));
    $this->plugin_url = plugin_dir_url(dirname(__FILE__, 2));
    $this->plugin = plugin_basename(dirname(__FILE__, 3)) . '/pocket-money-plugin.php';
    $this->default_scripts_dependency = "jquery";
    $this->cpt_jobs = 'jobs';
  }
}
