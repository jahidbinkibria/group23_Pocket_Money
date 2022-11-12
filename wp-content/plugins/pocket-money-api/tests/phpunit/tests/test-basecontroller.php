<?php


/**
 * @package PMApiPlugin
 */

namespace Inc\Base;


class TestBaseController extends \WP_UnitTestCase

{

  public function test_construct()
  {

    $objBaseController = new BaseController();

    $this->assertNotEmpty($objBaseController->plugin_version, "Plugin version is required.");
    $this->assertEquals("pmapi", $objBaseController->plugin_version, "Plugin slug name must be pmapi");
  }
}