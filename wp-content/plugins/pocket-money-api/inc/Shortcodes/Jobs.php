<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Shortcodes;

use Inc\Api\ShortcodeApi;
use \Inc\Base\BaseController;
use \Inc\Api\Callbacks\JobsShortcodes;

class Jobs extends BaseController
{

  public $shortcodes;

  public $callbacks;

  public function register()
  {

    $this->shortcodes = new ShortcodeApi();
    $this->callbacks = new JobsShortcodes();

    $shortcodes = [
      [
        'tag' => 'jobs',
        'callback' => [$this->callbacks, 'cb_jobs']
      ],
      [
        'tag' => 'jobstax',
        'callback' => [$this->callbacks, 'cb_jobstax']
      ]
    ];

    $this->shortcodes->addShortcodes($shortcodes)->register();
  }
}