<?php

/**
 * @package PMApiPlugin
 */

/*
  Plugin Name: Pocket Money API Addon
  Version: 1.0.0
  Description: Custom Pocket Money API Addon
  Author: Group 23
  Author URI:  https://github.com/xenioushk/
  Text Domain: pmapi
  Domain Path: /languages/
 */

// security check.
defined('ABSPATH') or die("Unauthorized access");

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
    require_once dirname(__FILE__) . '/vendor/autoload.php';
}

use Inc\Base\Activate;
use Inc\Base\Deactivate;

function pmapiActivePlugin()
{
    Activate::activate();
}

register_activation_hook(__FILE__, 'pmapiActivePlugin');

function pmapiDeactivePlugin()
{
    Deactivate::deactivate();
}
register_activation_hook(__FILE__, 'pmapiDeactivePlugin');


if (class_exists('Inc\\Init')) {
    Inc\Init::registerServices();
}