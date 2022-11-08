<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks;

use Inc\Base\BaseController;
use \WP_Query;

class CaseStudyShortcodes extends BaseController

{

  function cb_casestudy($atts)
  {

    $atts = shortcode_atts(
      array(
        'post_type' => 'case_study',
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

    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $args = array(
      'post_status'       => $post_status,
      'post_type'         => $post_type,
      'orderby'             => $orderby,
      'order'                => $order,
      'posts_per_page' => 2, // change later.
      'paged' => $paged
    ); //


    if (!empty(get_query_var('tax'))) {
      $args['tax_query']  = array(                     //(array) - use taxonomy parameters (available with Version 3.1).
        'relation' => 'AND',                      //(string) - Possible values are 'AND' or 'OR' and is the equivalent of ruuning a JOIN for each taxonomy
        array(
          'taxonomy' => str_replace("case_study_", "", get_query_var('tax')),                //(string) - Taxonomy.
          'field' => 'slug',                    //(string) - Select taxonomy term by ('id' or 'slug')
          'terms' => $_REQUEST['cat'],    //(int/string/array) - Taxonomy term(s).
          'include_children' => 0,           //(bool) - Whether or not to include children for hierarchical taxonomies. Defaults to true.
          'operator' => 'IN'                    //(string) - Operator to test. Possible values are 'IN', 'NOT IN', 'AND'.
        )
      );
    }
    // All Taxonomy Filter

    if (!empty($meta_key)) {
      $args['meta_key'] = $meta_key;
    }
    $loop = new WP_Query($args);

    $all_case_studies = "";

    if ($loop->have_posts()) :

      $all_case_studies .= "<div id='all_case_studies'>";

      $all_case_studies .= "<div id='case_studies'>";
      while ($loop->have_posts()) :

        $loop->the_post();

        $all_case_studies .= "<p>" . get_the_title() . "</p>";

      endwhile;
      $all_case_studies .= "</div>";

      $big = 999999999;
      $all_case_studies .= '<div id="cs_pagination">' . paginate_links(array(
        'base' => str_replace($big, '%#%', html_entity_decode(get_pagenum_link($big))),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $loop->max_num_pages,
        'prev_text' => '&laquo;',
        'next_text' => '&raquo;'
      )) . '</div>';

      $all_case_studies .= "</>";

    endif;


    wp_reset_postdata();
    return $all_case_studies;
  }

  function cb_casestudytax($atts)
  {
    $atts = shortcode_atts(
      [
        'taxonomy' => 'industry', // industry, technology, product        
        'widget_title' => '',
        'orderby' => 'title',
        'order' => 'ASC',
        'class' => 'case_study_dropdown',
        'dropdown' => true
      ],
      $atts
    );

    extract($atts);


    $taxonomy_terms = get_terms(
      $taxonomy,
      [
        'orderby' => $orderby,
        'order' => $order,
        'hide_empty' => false
      ]
    );

    if (is_array($taxonomy_terms)) {

      $drop_down_html = "<select class=$class>";

      $drop_down_html .= "<option value='' selected='selected'>All $taxonomy</option>";

      foreach ($taxonomy_terms as $term) {

        // echo "<pre>";
        // print_r($term);
        // echo "</pre>";
        $name = $term->name;
        $slug = $term->slug;
        //$slug = $term['slug'];
        $count = $term->count;

        $drop_down_html .= "<option value=$term->slug data-cat=$term->slug data-tax=case_study_$taxonomy>$term->name</option>";
      }

      $drop_down_html .= "<select>";
    }


    wp_reset_query();


    return $drop_down_html;
  }
}