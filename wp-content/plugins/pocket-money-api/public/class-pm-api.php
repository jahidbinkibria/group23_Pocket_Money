<?php

class PM_API_Addon {

    const VERSION = PM_API_ADDON_CURRENT_VERSION;

    protected $plugin_slug = 'pm';
    protected static $instance = null;

    private function __construct() {

        
        // Load plugin text domain
        add_action('init', array($this, 'load_plugin_textdomain'));

        // Activate plugin when new blog is added
        add_action('wpmu_new_blog', array($this, 'activate_new_site'));

        // Load public-facing style sheet and JavaScript.
        // add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
        // add_action('vc_load_iframe_jscss', array($this, 'PM_API_load_front_editor_scripts'));

        if(is_admin()){
            // add_action('pre_get_posts', array($this, 'pm_custom_post_order'), 5);
        }
        
    }

    function pm_custom_post_order( $wp_query ) {

        global $pagenow;

        $post_type = (isset($_GET['post_type']) && $_GET['post_type']!="") ? $_GET['post_type']: "";

        if (  'edit.php' == $pagenow && $post_type == PM_CPT_TAG && !isset($_GET['orderby'])) {
        
            $wp_query->set( 'orderby', 'date' );
            $wp_query->set( 'order', 'DESC' );       
        }
        }

    /**
     * Return the plugin slug.
     */
    public function get_plugin_slug() {
        return $this->plugin_slug;
    }

    /**
     * Return an instance of this class.
     */
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    /**
     * Fired when the plugin is activated.
     */
    public static function activate($network_wide) {

        if (function_exists('is_multisite') && is_multisite()) {

            if ($network_wide) {

                // Get all blog ids
                $blog_ids = self::get_blog_ids();

                foreach ($blog_ids as $blog_id) {

                    switch_to_blog($blog_id);
                    self::single_activate();
                }

                restore_current_blog();
            } else {
                self::single_activate();
            }
        } else {
            self::single_activate();
        }
    }

    /**
     * Fired when the plugin is deactivated.
     */
    public static function deactivate($network_wide) {

        if (function_exists('is_multisite') && is_multisite()) {

            if ($network_wide) {

                // Get all blog ids
                $blog_ids = self::get_blog_ids();

                foreach ($blog_ids as $blog_id) {

                    switch_to_blog($blog_id);
                    self::single_deactivate();
                }

                restore_current_blog();
            } else {
                self::single_deactivate();
            }
        } else {
            self::single_deactivate();
        }
    }

    /**
     * Fired when a new site is activated with a WPMU environment.
     */
    public function activate_new_site($blog_id) {

        if (1 !== did_action('wpmu_new_blog')) {
            return;
        }

        switch_to_blog($blog_id);
        self::single_activate();
        restore_current_blog();
    }

    private static function get_blog_ids() {

        global $wpdb;

        // get an array of blog ids
        $sql = "SELECT blog_id FROM $wpdb->blogs
			WHERE archived = '0' AND spam = '0'
			AND deleted = '0'";

        return $wpdb->get_col($sql);
    }

    /**
     * Fired for each blog when the plugin is activated.
     */
    private static function single_activate() {
        // @TODO: Define activation functionality here
    }

    /**
     * Fired for each blog when the plugin is deactivated.
     */
    private static function single_deactivate() {
        // @TODO: Define deactivation functionality here
    }

    /**
     * Load the plugin text domain for translation.
     */
    public function load_plugin_textdomain() {

        $domain = $this->plugin_slug;
        $locale = apply_filters('plugin_locale', get_locale(), $domain);
        load_textdomain($domain, trailingslashit(WP_LANG_DIR) . $domain . '/' . $domain . '-' . $locale . '.mo');

        // require_once( PM_API_PATH . 'includes/gg_addon_helpers.php' );

        // $custom_vc_elements = array('pm');
      
        // foreach ($custom_vc_elements as $key => $value) {
        //     require_once( PM_API_PLUGIN_ADDON_PATH . $value . '/' . $value . '.php' ); // New
        // }
    }

    /**
     * Register and enqueue public-facing style sheet.
     */
    public function enqueue_styles() {

        // Styles.
        // wp_enqueue_style($this->plugin_slug . '-plugin-styles', plugins_url('assets/css/gg.public.css', __FILE__), array(), self::VERSION);


        // Scripts.
        // wp_enqueue_script($this->plugin_slug . '-jquery-tipsy-script', PM_API_PLUGIN_DIR . 'public/assets/js/jquery.tipsy.js', array('jquery'), self::VERSION, TRUE);
        // wp_enqueue_script($this->plugin_slug . '-plugin-script', PM_API_PLUGIN_DIR . 'build/index.js', array('jquery'), self::VERSION, true);
        // wp_enqueue_script($this->plugin_slug . '-plugin-script', PM_API_PLUGIN_DIR . 'public/assets/js/gg.public.js', array('jquery'), self::VERSION, true);
        
        //localization.

        wp_localize_script($this->plugin_slug . '-plugin-script', 'ggAdditionalData', array(
            'gg_app_root' => get_site_url()
        ));
    }

    /**
     * Front End Visual Composer Style & Scripts.
     */
    public function PM_API_load_front_editor_scripts() {
        // wp_enqueue_style($this->plugin_slug . '-vc-front-end-styles', plugins_url('assets/css/vc_front_end_styles.css', __FILE__), array(), self::VERSION);
        // wp_enqueue_script($this->plugin_slug . '-vc-front-end-script', PM_API_PLUGIN_DIR . 'public/assets/js/vc_front_end_scripts.js', array('jquery'), self::VERSION);
    }

}