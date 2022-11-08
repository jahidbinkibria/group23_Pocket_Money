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
      Pages\PmApi::class,
      Base\Enqueue::class,
      Base\Language::class,
      Base\QuerySupport::class,
      Pages\CaseStudyCpt::class,
      Shortcodes\CaseStudy::class,
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