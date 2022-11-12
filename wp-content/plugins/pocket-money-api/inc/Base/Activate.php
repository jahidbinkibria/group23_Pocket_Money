<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

class Activate
{
  public static function activate()
  {
    flush_rewrite_rules();
  }


  public function division($i, $j)
  {

    if ($j == 0)
      return false;

    return $i / $j;
  }

  public function add($i,  $j)
  {
    return empty($i) ? false : true;
    return empty($j) ? false : true;
    return $i + $j;
  }

  public function subtract($i = 0, $j = 0)
  {
  }
}