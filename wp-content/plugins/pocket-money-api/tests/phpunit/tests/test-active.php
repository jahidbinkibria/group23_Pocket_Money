<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Base;

class Active extends \WP_UnitTestCase
{
  public function test_divison()
  {
    // $this->assertCount(0, ['foo']);
    $active = new Activate();
    // Test Division.
    $result = $active->division(4, 2);
    $this->assertEquals(2, $result, "actual value is not equals to expected ");

    $result = $active->division(5, 0);
    $this->assertFalse($result, "Second value cannot be zero."); // if second value is set as zero it should return false. So the function is work as expected.

    $data_from_function = ['a', 'b'];
    $test_data = ['a', 'b'];

    $this->assertEquals($data_from_function, $test_data, 'Both data are not same!');
  }
  public function test_add()
  {


    $active = new Activate();




    //

    $result = $active->add(1, 2);

    $this->assertTrue($result, "Argument Missing");

    $result = $active->add(1, 2);

    $this->assertEquals(
      3,
      $result,
      "actual value is not equals to expected"
    );


    // $this->assertSame('wp-simple-plugin', WPSP_NAME);

    // $url = str_replace(
    //   'tests/phpunit/tests/',
    //   '',
    //   trailingslashit(plugin_dir_url(__FILE__))
    // );
    // $this->assertSame($url, WPSP_URL);
  }
}