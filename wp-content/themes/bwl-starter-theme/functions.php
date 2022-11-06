<?php

function ourAssets()
{
  wp_enqueue_script('my-main-js', get_theme_file_uri('/index.js'), NULL, '1.0', true);
}

add_action('wp_enqueue_scripts', 'ourAssets');