<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Base;


class Language extends BaseController
{
  public function register()
  {
    add_action('init', [$this, 'load_plugin_textdomain']);
  }

  public function load_plugin_textdomain()
  {
    $domain = $this->plugin_slug;
    $locale = apply_filters('plugin_locale', get_locale(), $domain);
    load_textdomain($domain, trailingslashit(WP_LANG_DIR) . $domain . '/' . $domain . '-' . $locale . '.mo');
  }
}