<?php

// change the next line to points to your wordpress dir
// define('ABSPATH', '/opt/lampp/wptest/wordpress/');
// define('ABSPATH', '/var/www/html/');
define('ABSPATH', 'E:\docker_projects/pocket_money/');
define('WP_DEBUG', false);

// WARNING WARNING WARNING!
// tests DROPS ALL TABLES in the database. DO NOT use a production database

define('DB_NAME', 'db_pocketmoney_test');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

$table_prefix = 'wp_'; // Only numbers, letters, and underscores please!

define('WP_TESTS_DOMAIN', 'localhost');
define('WP_TESTS_EMAIL', 'admin@example.org');
define('WP_TESTS_TITLE', 'Test Blog');

define('WP_PHP_BINARY', 'php');

define('WPLANG', '');