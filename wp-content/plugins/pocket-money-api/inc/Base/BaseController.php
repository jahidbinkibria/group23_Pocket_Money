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
  }


  public function get_img($attachment_id, $img_size = "")
  {

    $img_width = (isset($img_size) && $img_size != "") ? $img_size : 'full';

    $img_string = wp_get_attachment_image($attachment_id, $img_width);

    return $img_string;
  }

  function img_dimension($attachment_id, $img_size = "")
  {

    $img_string = '';

    // thumbnail, medium, large, full

    $img_width = (isset($img_size) && $img_size != "") ? $img_size : 'full';

    $image_info = wp_get_attachment_image_src($attachment_id, $img_width);

    $image_srcset = wp_get_attachment_image_srcset($attachment_id);

    if (isset($image_info) && !empty($image_info)) {

      $img_string .= 'src="' . $image_info[0] . '"';
      $img_string .= ' width="' . $image_info[1] . '" height="' . $image_info[2] . '" ';
      $img_string .= ' srcset="' . $image_srcset . '"';
    }

    return $img_string;
  }
}