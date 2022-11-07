<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks;

use Inc\Base\BaseController;
use \WP_Query;

class ShortcodeCallbacks extends BaseController

{

  function cb_casestudy($atts)
  {

    $atts = shortcode_atts(
      array(
        'cb' => 1, //cb = checkbox
        'taxonomy' => '', // gg_pub_doc_type, gg_pub_author, gg_pub_year
        'orderby' => 'ID',
        'order'     => 'DESC',
        'limit'      => -1,
        'post_status'       => 'publish',
        'meta_key' => ''
      ),
      $atts
    );

    extract($atts);

    return "hello from case study list";
  }

  function cb_casestudytax($atts)
  {
    $prefix = "";
    $atts = shortcode_atts(
      array(
        'cb' => 1, //cb = checkbox
        'taxonomy' => 'industry', // gg_pub_doc_type, gg_pub_author, gg_pub_year        
        'widget_title' => '',
        'orderby' => 'ID',
        'order' => 'DESC'
      ),
      $atts
    );

    extract($atts);


    $taxonomy_terms = get_terms(
      $prefix . $taxonomy,
      array(
        'orderby' => $orderby,
        'order' => $order,
        'hide_empty' => false
      )
    );

    if (is_array($taxonomy_terms)) {


      foreach ($taxonomy_terms as $term) {

        echo "<pre>";
        print_r($term);
        echo "</pre>";
        $name = $term->name;
        $slug = $term->slug;
        //$slug = $term['slug'];
        $count = $term->count;
      }
    }


    return "hello from case study texonomy";
  }
}