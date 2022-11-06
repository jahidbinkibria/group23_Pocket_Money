<?php

/**
 * @package PMApiPlugin
 */

use Inc\Init;

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

if (class_exists('Inc\\Init')) {
    Init::registerServices();
}

use Inc\Base\Activate;
use Inc\Base\Deactivate;

register_activation_hook(__FILE__, [Activate::class, 'activate']);
register_activation_hook(__FILE__, [Deactivate::class, 'dectivate']);


// End of plugin activation check status.

define('PM_API_ADDON_TITLE', 'Pocket Money API Addon');
define('PM_API_ADDON_CURRENT_VERSION', '1.0.0'); // change plugin current version in here.

define('PM_API_PATH', plugin_dir_path(__FILE__)); // relative path.
define("PM_API_PLUGIN_DIR", plugins_url() . '/pocket-money-api/'); // absolute dir with http.
define("PM_API_PLUGIN_ADDON_PATH", PM_API_PATH . 'addons/');

define("PM_API_PRIMARY_COLOR", "#80B435");
define("PM_API_LIGHT_BG", "#FFFFFF");
define("PM_API_LINK_HOVER_COLOR", "#50726C");
define("PM_API_TEXT_COLOR", "#888888");
define("PM_API_LIGHT_TEXT_COLOR", "#FFFFFF");
define("PM_API_BORDER_COLOR", "#CCCCCC");



// require_once(plugin_dir_path(__FILE__) . 'public/class-pm-api.php');
// require_once(plugin_dir_path(__FILE__) . 'includes/pm_rest_api.php');



// add_action('plugins_loaded', array('PM_API_Addon', 'get_instance'));

if (is_admin()) {

    // require_once( plugin_dir_path(__FILE__) . 'admin/gg-spin-game-report.php' );
    // require_once( plugin_dir_path(__FILE__) . 'admin/class-gg-wpb-admin.php' );
    // add_action('plugins_loaded', array('PM_API_Addon_Admin', 'get_instance'));

}