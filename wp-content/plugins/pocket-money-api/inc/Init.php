<?php

/**
 * @package PMApiPlugin
 */

namespace Inc;

class Init
{

  public static function getServices()
  {

    return [
      Base\Enqueue::class,
      Base\Language::class,
      Pages\PmApi::class,
      Pages\JobsCpt::class,
      Pages\CustomColumns::class
    ];
  }

  public static function registerServices()
  {

    foreach (self::getServices() as $service) {

      $service = self::instantiate($service);

      if (method_exists($service, 'register')) {
        $service->register();
      }
    }
  }

  private static function instantiate($class)
  {

    return new $class();
  }
}