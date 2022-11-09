<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

class Enqueue extends BaseController
{

  public function register()
  {

    //for front end.
    add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);

    // for admin.
    add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);

    // ajax loading. will shift it from here later.
    add_action('wp_ajax_nopriv_load_more_posts', [$this, 'load_more_posts']);
    add_action('wp_ajax_load_more_posts', [$this, 'load_more_posts']);
  }

  public function load_more_posts()
  {
    ob_start();

    $current_page = $_REQUEST['current_page'] ?? 1;
    $tax = $_REQUEST['tax'] ?? "";
    $cat = $_REQUEST['cat'] ?? "";
    //
    echo do_shortcode("[casestudy ajax='1' current_page='$current_page' ajax_tax='$tax' ajax_cat='$cat']");
    wp_send_json_success(ob_get_clean());

    die();
  }

  private function getAppStyles()
  {
    //only write the style file name.
    return [
      'frontend'
    ];
  }

  private function getAppScripts()
  {
    // only write the script file name
    // key value associative array contains the dependencies. 
    // seperate dependencies by comma(,)
    return [
      'frontend' => ""
    ];
  }

  public function enqueueScripts()
  {

    // Localize scripts.
    // Mostly use for the ajax request.
    // pmapi-app-script-js


    // wp_localize_script($this->plugin_slug . '-plugin-script', $this->plugin_slug . 'AdditionalData', array(
    //   $this->plugin_slug . '_app_root' => get_site_url()
    // ));

    // App Styles.

    if (!empty($appStyles = $this->getAppStyles())) {
      foreach ($appStyles as $style) {
        wp_enqueue_style($this->plugin_slug . '-' . "$style-style", $this->plugin_url . "assets/styles/$style.css", [], $this->plugin_version);
      }
    }

    // App Scripts 

    if (!empty($appScripts = $this->getAppScripts())) {
      foreach ($appScripts as $script => $dependency) {
        $dependency = (!empty($dependency)) ? $this->default_scripts_dependency . ',' . $dependency : $this->default_scripts_dependency;
        wp_enqueue_script($this->plugin_slug . '-' . "$script-script", $this->plugin_url . "assets/scripts/$script.js", array($dependency), '', TRUE);
      }
    }

    // Localize scripts.
    // It hooks with the first script.
    wp_localize_script($this->plugin_slug . '-app-script', $this->plugin_slug . 'AdditionalData', array(
      $this->plugin_slug . '_app_root' => get_site_url()
    ));
  }

  public function adminEnqueueScripts()
  {
    wp_enqueue_style($this->plugin_slug . '-app-style', $this->plugin_url . 'assets/styles/admin.css', [], $this->plugin_version);
    wp_enqueue_script($this->plugin_slug . '-app-script', $this->plugin_url . 'assets/scripts/admin.js', array('jquery'), $this->plugin_version, TRUE);
  }
}