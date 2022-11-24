<?php

/**
 * @package PMApiPlugin
 */

namespace Inc\Api;

use \Inc\Base\BaseController;


// PmApi's interface class.

class EmailApi extends BaseController

{

  public $email_settings = [];

  public function register()
  {
    if (!empty($this->email_settings)) {
      $this->sendEmailNow();
    }
  }

  public function addEmail(array $email_settings)
  {
    $this->email_settings = $email_settings;
    return $this;
  }

  public  function sendEmailNow()
  {

    foreach ($this->email_settings as $settings) {


      // $header = trim($settings['header']);
      $to = trim($settings['to']);
      $subject = trim($settings['subject']);
      $body = trim($settings['body']);

      // echo "<pre>";
      // print_r($settings);
      // echo "</pre>";

      $reply_to = sanitize_email($this->no_reply_email);

      $headers[] = "From: Confirmation <$reply_to>";
      // $headers[] = "From: $header";

      add_filter('wp_mail_content_type', [$this, 'set_html_content_type']);
      \wp_mail($to, $subject, $body, $headers);
      remove_filter('wp_mail_content_type', [$this, 'set_html_content_type']);
    }
  }

  public function set_html_content_type()
  {
    return 'text/html';
  }

  public function debug_wpmail($result = false)
  {

    if ($result)
      return;

    global $ts_mail_errors, $phpmailer;

    if (!isset($ts_mail_errors))
      $ts_mail_errors = array();

    if (isset($phpmailer))
      $ts_mail_errors[] = $phpmailer->ErrorInfo;

    print_r('<pre>');
    print_r($ts_mail_errors);
    print_r('</pre>');
  }
}