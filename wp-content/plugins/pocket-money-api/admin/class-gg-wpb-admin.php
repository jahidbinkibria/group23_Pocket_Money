<?php

class GG_SPIN_API_Addon_Admin {
    
    protected static $instance = null;
    
    protected $plugin_screen_hook_suffix = null;

    private function __construct() {
        $plugin = GG_SPIN_API_Addon::get_instance();
        $this->plugin_slug = $plugin->get_plugin_slug();

        // Load admin style sheet and JavaScript.
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));

        add_action( 'admin_init', 'gg_spin_report_generate_csv' );

        // sub menu.
        add_action('admin_menu', 'gg_spin_report_submenu');        

    }
    
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function enqueue_admin_scripts() {
        wp_enqueue_style($this->plugin_slug . '-admin-styles', plugins_url('assets/css/admin.css', __FILE__), array(), GG_SPIN_API_Addon::VERSION);
    }

}