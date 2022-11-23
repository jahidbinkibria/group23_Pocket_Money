<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Api\Callbacks\Rest;

use Inc\Base\BaseController;
use \WP_Query;

class SearchCallback extends BaseController

{

  // Job Search.

  public function pmJobSearch($data)
  {

    // wp-json/pmapi/v1/search?s=baby&cat=11

    // echo "<pre>";
    // print_r($data['s']);
    // print_r($data['cat']);
    // echo "</pre>";

    // die();

    // http://yourdomain.com/wp-json/pmapi/v1/search
    $args = [
      'post_type' => 'jobs',
      'posts_per_page' => -1,
      'orderby' => 'title',
      'order' => 'ASC',
      'posts_per_page' => 5,
      's' => sanitize_text_field($data['s'])
      // 's' => '12'
    ];

    // $args['meta_key'] = GG_PUB_CMB_PREFIX . 'year';
    // $args['orderby'] = "meta_value_num";

    // $args['tax_query']              = array(
    //   'relation' => 'AND'        
    // );

    // if(isset($data['docs_type'])) {

    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_DOC_TYPE, // taxonomy slug
    //     'terms'            => explode('_', $data['docs_type']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }

    // if(isset($data['year'])) {
    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_YEAR, // taxonomy slug
    //     'terms'            => explode('_', $data['year']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }


    // if(isset($data['author'])) {

    //   $args['tax_query'][] = array(
    //     'taxonomy'         => GG_PUB_TAX_AUTHOR, // taxonomy slug
    //     'terms'            => explode('_', $data['author']), // term ids
    //     'field'            => 'slug', // Also support: slug, name, term_taxonomy_id
    //     'operator'         => 'IN', // Also support: slug, name, term_taxonomy_id
    //     'include_children' => true,
    //   );
    // }

    $jobs = new WP_Query($args);
    $result = $jobs;

    $jobs_data = [];

    while ($result->have_posts()) {

      $result->the_post();

      $post_id = get_the_ID();

      // $category = get_the_terms($post_id, 'category');
      // $category = join(', ', wp_list_pluck($category, 'name'));

      // $price = get_field('price', $post_id);

      // $tax_author = pm_tax_term_as_string( get_the_terms( $post_id, GG_PUB_TAX_AUTHOR, ARRAY_A ) );                    

      // $tax_year = pm_tax_term_as_string ( get_the_terms( $post_id, GG_PUB_TAX_YEAR, ARRAY_A ) );                  

      // Post Meta.

      // $author = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'author', true);
      // $year = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'year', true);
      // $address = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'address', true);
      // $url = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'url', true);
      // $abstract = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'abstract', true);
      // $volume = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'volume', true);
      // $journal = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'journal', true);
      // $pages = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'pages', true);
      // $publisher = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'publisher', true);
      // $booktitle = cleanup_title( get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'booktitle', true) );
      // $raw_data = get_post_meta($post_id, GG_PUB_CMB_PREFIX. 'raw_data', true);


      array_push($jobs_data, array(
        'id' => $post_id,
        'title' => get_the_title(),
        // 'excerpt' => get_the_excerpt(),
        // 'category' => $category,
        // 'price' => $price,


        // 'author' => $author,
        // 'year'=> $year,
        // 'address'=> $address,
        // 'url'=> $url,
        // 'abstract'=> $abstract,
        // 'volume'=> $volume,
        // 'journal'=> $journal,
        // 'pages'=> $pages,
        // 'publisher'=> $publisher,
        // 'booktitle'=> $booktitle,
        // 'raw_data'=> $raw_data,
      ));
    }


    return $jobs_data;
  }
}
