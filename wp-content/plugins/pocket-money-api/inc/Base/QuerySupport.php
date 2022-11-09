<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

class QuerySupport
{
  public function register()
  {
    add_filter('query_vars', [$this, 'add_query_vars_filter']);
  }

  public function add_query_vars_filter($vars)
  {
    $vars[] = "tax";
    return $vars;
  }
}