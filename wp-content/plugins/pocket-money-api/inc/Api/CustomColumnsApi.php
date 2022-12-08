<?php

namespace  Inc\Api;

use  Inc\Base\BaseController;
use  Inc\Api\Callbacks\CustomColumnsCallbacks;

class CustomColumnsApi extends BaseController
{

  public $postTypes = [];

  public function addPostTypes(array $postTypes)
  {
    $this->postTypes = $postTypes;
    return $this;
  }

  public function register()
  {

    if (empty($this->postTypes)) return;

    $customColumnsCallBacks = new CustomColumnsCallbacks();

    foreach ($this->postTypes as $postType) {

      add_filter('manage_' . $postType . '_columns', [$customColumnsCallBacks, 'columnHeader']);

      add_action('manage_' . $postType . '_custom_column', [$customColumnsCallBacks, 'columnData'], 10, 1);
    }
  }
}