<?php

Class GG_SPIN_CPT {


  function __construct()
  {
    define("GG_P_SPIN_TEXT", "Wheel Spin");
    define("GG_S_SPIN_TEXT", "Wheel Spin");
    define("GG_SPIN_MENU_TEXT", "Wheel Spin");
    define("GG_SPIN_CPT_TAG", "gg_spin");
    define("GG_SPIN_TAX_DOC_TYPE", "gg_spin_doc_type");
    define("GG_SPIN_TAX_AUTHOR", "gg_spin_author");
    define("GG_SPIN_TAX_YEAR", "gg_spin_year");
    define("GG_SPIN_CMB_PREFIX", "gg_spin_");
    
    define("GG_SPIN_PLAYER_1_TITLE", "USER");
    define("GG_SPIN_PLAYER_2_TITLE", "BOT");
    $this->register_post_type();

    add_filter('manage_gg_spin_posts_columns', 'gg_spin_column_header' );
    add_action('manage_gg_spin_posts_custom_column', 'gg_spin_custom_column', 10, 1);
    
  }


public function register_post_type() {

  $gg_spin_custom_slug = "gg_spin";

  $labels = array(
      'name' => esc_html__('All', 'gg_spin') .' ' . GG_P_SPIN_TEXT,
      'singular_name' => GG_S_SPIN_TEXT,
      'add_new' => esc_html__('Add New', 'gg_spin') .' ' . GG_S_SPIN_TEXT, 
      'add_new_item' => esc_html__('Add New', 'gg_spin') .' ' . GG_S_SPIN_TEXT,
      'edit_item' => esc_html__('Edit', 'gg_spin') .' ' . GG_S_SPIN_TEXT,
      'new_item' => esc_html__('New', 'gg_spin') .' ' . GG_S_SPIN_TEXT,
      'all_items' => esc_html__('All', 'gg_spin') .' ' . GG_P_SPIN_TEXT,
      'view_item' => esc_html__('View', 'gg_spin') .' ' . GG_S_SPIN_TEXT,
      'search_items' => esc_html__('Search', 'gg_spin')  .' ' . GG_S_SPIN_TEXT,
      'not_found' => esc_html__('Not found', 'gg_spin'),
      'not_found_in_trash' => esc_html__('Not found in trash', 'gg_spin'),
      'parent_item_colon' => '',
      'menu_name' => GG_SPIN_MENU_TEXT
  );

  //$GG_SPIN_supports = array('title', 'editor','revisions', 'author');
  $GG_SPIN_supports = array('title', 'revisions', 'author', 'custom-fields'); 
  
  $GG_SPIN_publicly_queryable = false;    // Disable Single Page Generate introduced version 1.8.2
  
  $args = array(
      'labels' => $labels,
      'query_var' => 'gg_pub',  
      'show_in_nav_menus' => true,
      'public' => true,
      'show_ui' => true,
      'show_in_menu' => true,
      'rewrite' => array(
          'slug' => $gg_spin_custom_slug,
          'with_front' => true //before it was true
      ),
      'publicly_queryable' => $GG_SPIN_publicly_queryable,
      'capability_type' => 'post',
      'has_archive' => false,
      'hierarchical' => true,
      'show_in_admin_bar' => true,
      'show_in_rest' => true,
      'supports' => $GG_SPIN_supports,
      'menu_icon' => 'dashicons-media-document'
  );

  register_post_type('gg_spin', $args);
  
}


}