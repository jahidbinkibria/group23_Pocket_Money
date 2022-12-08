<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Pages;

use Inc\Base\BaseController;
use  Inc\Api\CustomColumnsApi;

class CustomColumns extends BaseController
{
  public $customColumns;

  public function register()
  {
    $this->customColumns = new CustomColumnsApi();

    $postTypes = [];

    $availablePostTypes = ['jobs'];

    foreach ($availablePostTypes as $availablePostTypes_value) {

      $post_type = 'posts';

      if ($availablePostTypes_value == 'page') {

        $post_type = 'pages';
      } else {

        $post_type = $availablePostTypes_value . '_posts';
      }

      array_push($postTypes, $post_type);
    }

    $this->customColumns->addPostTypes($postTypes)->register();
  }
}