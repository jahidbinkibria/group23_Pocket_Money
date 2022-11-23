/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.dev/assets/shared/js/frontend/components/primary-menu.js":
/*!*******************************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/components/primary-menu.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_responsive_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/responsive-nav */ "./.dev/assets/shared/js/frontend/vendor/responsive-nav.js");
/* global TenUp */

/**
 * Hook up navigation.
 */

const init = () => {
  if (TenUp) {
    TenUp.navigation({
      target: '#header__navigation',
      toggle: '#nav-toggle',
      // eslint-disable-next-line
      sub_menu_open: goFrontend.openMenuOnHover ? 'hover' : 'click'
    });
  }

  document.addEventListener('keydown', lockMenuFocus);
};
/**
 * Lock tabbing to the main navigation only.
 *
 * @param {event} e
 */


function lockMenuFocus(e) {
  if (['Space', 'Enter', 'Tab'].includes[e.code] || !document.querySelector('body').classList.contains('menu-is-open')) {
    return;
  }

  const element = document.querySelector(':focus');
  const isShiftTab = e.shiftKey && e.code === 'Tab';

  if (element.getAttribute('id') === 'nav-toggle') {
    if (isShiftTab) {
      return;
    }

    setTimeout(function () {
      document.querySelectorAll('ul.primary-menu li:first-child a')[0].focus();
    }, 10);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (init);

/***/ }),

/***/ "./.dev/assets/shared/js/frontend/components/search-toggle.js":
/*!********************************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/components/search-toggle.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const searchToggle = () => {
  const searchToggleEl = document.getElementById('header__search-toggle');

  if (!searchToggleEl) {
    return;
  }

  const performToggle = element => {
    const toggle = element;
    const target = document.querySelector(toggle.dataset.toggleTarget);

    if (target.classList.contains('show-modal')) {
      // Hide the modal.
      target.classList.remove('active');
      setTimeout(() => {
        target.classList.remove('show-modal');
        toggle.focus();
      }, 250);
    } else {
      // Show the modal.
      target.classList.add('show-modal');
      setTimeout(() => {
        target.classList.add('active');

        if (toggle.dataset.setFocus) {
          const focusElement = document.querySelector(toggle.dataset.setFocus);

          if (focusElement) {
            const searchTerm = focusElement.value;
            focusElement.value = '';
            focusElement.focus();
            focusElement.value = searchTerm;
          }
        }
      }, 10);
    }
  };

  document.querySelectorAll('*[data-toggle-target]').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      performToggle(element);
    });
  }); // Close modal on escape key press.

  document.addEventListener('keyup', event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      document.querySelectorAll('.search-modal.active').forEach(element => {
        performToggle(document.querySelector('*[data-toggle-target="' + element.dataset.modalTargetString + '"]'));
      });
    }
  }); // Close modal on outside click.

  document.addEventListener('click', event => {
    const target = event.target;
    const modal = document.querySelector('.search-modal.active');

    if (target === modal) {
      performToggle(document.querySelector('*[data-toggle-target="' + modal.dataset.modalTargetString + '"]'));
    }
  });
  document.addEventListener('keydown', lockSearchFocus);
};
/**
 * Lock tabbing to the search form only.
 *
 * @param {event} e
 */


function lockSearchFocus(e) {
  // If the keypress isn't a tab or the search form isn't active, return
  if (e.keyCode !== 9 || !document.querySelector('.site-search.active')) {
    return;
  } // Current active element before it moves


  const activeElement = document.activeElement; // If we're on the input and shift+tab was pressed, override and focus on button.

  if (document.activeElement.classList.contains('search-form__input') && e.shiftKey) {
    setTimeout(function () {
      // Focus the correct button by only looking for it in the parent element
      activeElement.parentElement.getElementsByClassName('search-input__button').item(0).focus();
    }, 10);
  } // If we're on the button and tab was pressed, override and focus on input.


  if (document.activeElement.classList.contains('search-input__button') && !e.shiftKey) {
    setTimeout(function () {
      // Focus the correct input by only looking for it in the parent element
      activeElement.parentElement.getElementsByClassName('search-form__input').item(0).focus();
    }, 10);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (searchToggle);

/***/ }),

/***/ "./.dev/assets/shared/js/frontend/components/woo-menu-cart.js":
/*!********************************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/components/woo-menu-cart.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const menuObject = document.getElementById('header__cart-toggle');
const siteOverlay = document.getElementById('site-overlay');
const sideNav = document.getElementById('site-nav--cart');
const sideNavClose = document.getElementById('site-close-handle');

const wooMenuCart = () => {
  if (null === menuObject || null === siteOverlay || null === sideNavClose) {
    return;
  }

  document.body.classList.add('has-woo-cart-slideout');
  menuObject.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSideNavVisibility();
  });
  siteOverlay.addEventListener('click', toggleSideNavVisibility);
  sideNavClose.addEventListener('click', toggleSideNavVisibility);
};

const toggleSideNavVisibility = () => {
  sideNav.classList.toggle('active');
  siteOverlay.classList.toggle('active');
  document.body.classList.toggle('sidebar-move');
};

/* harmony default export */ __webpack_exports__["default"] = (wooMenuCart);

/***/ }),

/***/ "./.dev/assets/shared/js/frontend/utility/debounce.js":
/*!************************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/utility/debounce.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 *
 * @param {Function} func      Funtion to run against.
 * @param {number}   wait      Amount to wait
 * @param {boolean}  immediate Trigger on leading edge?
 */
const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const args = arguments;
    const context = this;
    /**
     * Later
     */

    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (debounce);

/***/ }),

/***/ "./.dev/assets/shared/js/frontend/vendor/responsive-nav.js":
/*!*****************************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/vendor/responsive-nav.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/debounce */ "./.dev/assets/shared/js/frontend/utility/debounce.js");

/********************************

	Name: WordPress Accessible Responsive Navigation Menu
	Usage:

	TenUp.build_menu({

		'target'		:	'#primary-nav',      // the selector of the nav menu <ul>
		'toggle'		:	'#js-menu-toggle',   // the ID of the link you're using to open/close the small screen menu
		'sub_menu_open'	:	'hover'

	}, function() {

		console.log('Amazing callback function!');

	});

********************************/

/* eslint-disable */

(function () {
  'use strict'; // Define global TenUp object if it doesn't exist

  if ('object' !== typeof window.TenUp) {
    window.TenUp = {};
  }
  /*
  	Cache and define some variables
  */
  // init function


  TenUp.navigation = function (options, callback) {
    var defaults = {
      'target': '#primary-nav',
      'toggle': '#js-menu-toggle',
      'sub_menu_open': 'hover'
    };
    var opt; // Map all default settings to user defined options if they exist

    for (opt = 0; opt < defaults.length; opt = opt + 1) {
      if (typeof options[opt] === 'undefined') {
        options[opt] = defaults[opt];
      }
    }

    var menu = document.querySelector(options.target); // Bail out if there's no menu

    if (!menu) {
      return;
    }

    var menu_id = menu.getAttribute('id');
    var menu_toggle = document.querySelector(options.toggle);
    var aria_controls = menu_toggle.getAttribute('aria-controls');
    var sub_menu_acion = options.sub_menu_open;
    var current_menu_item = menu.querySelector('.current-menu-item');
    var menu_items_links = menu.querySelectorAll('.menu-item > a');
    var menu_items_links_count = menu_items_links.length;
    var menu_items_with_children = menu.querySelectorAll('.menu-item-has-children');
    var menu_items_with_children_count = menu_items_with_children.length;
    var currentTarget;
    var target;
    var i; // Listener for the menu open/close action

    function listener_menu(e) {
      // Stop links from firing
      e.preventDefault();

      if (document.body.classList.contains('menu-is-open')) {
        // Close the menu
        menu.setAttribute('aria-hidden', 'true');
        menu_toggle.setAttribute('aria-expanded', 'false'); // Bubble to the document

        document.body.classList.remove('menu-is-open');
      } else {
        // Open the menu
        menu.setAttribute('aria-hidden', 'false');
        menu_toggle.setAttribute('aria-expanded', 'true'); // Set focus to the first link

        menu.querySelectorAll('a')[0].focus(); // Bubble to the document

        document.body.classList.add('menu-is-open');
      }
    }

    ; // listener_menu()
    // Listener for submenu on click

    function listener_submenu_click(e) {
      currentTarget = e.currentTarget;
      target = e.target;

      if (target.tagName === 'svg' || target.tagName === 'path') {
        target = currentTarget.closest('.menu-item > a');
      } else {
        console.log(target.previousSibling.previousSibling.href);

        if (goFrontend.isMobile) {
          if (target.tagName === 'A') {
            return;
          }

          if (target.tagName === 'UL') {
            let tempURL = target.previousSibling.previousSibling.href;

            if (null !== tempURL) {
              window.location.href = tempURL;
              return;
            }
          }
        }
      }

      if (target.getAttribute('aria-haspopup')) {
        // Stop links from firing
        e.preventDefault(); // Stop events from bubbling up to parent elements

        e.stopPropagation();
        var parent_menu = target.parentNode;
        var sub_menu = parent_menu.querySelector('.sub-menu');
        var all_open_menus = menu.querySelectorAll('.child-has-focus');
        var all_open_menus_count = all_open_menus.length;
        var all_open_menu_triggers = menu.querySelectorAll('.child-has-focus > a.submenu-is-open');
        var all_open_menu_triggers_count = all_open_menu_triggers.length;
        var t;

        if (get_screen_size('has-full-nav')) {
          if (all_open_menu_triggers_count > 0) {
            // Make sure only 1 menu item can be opened at a time
            for (t = 0; t < all_open_menu_triggers_count; t = t + 1) {
              // Check if the open menu is top-level, if so, close it
              if (parent_menu.parentNode === menu) {
                menu_sub_close(all_open_menu_triggers[t]);
              }
            } // for

          } // if

        } // if


        if ((e.target.nodeName === 'A' || target.tagName === 'A') && target.classList.contains('submenu-is-open')) {
          // The menu is already open, so this should be a close action
          menu_sub_close(target);
        } else {
          menu_sub_close_all(); // The menu is closed, so this click should open it

          menu_sub_open(target); // Reset the focus

          sub_menu.querySelectorAll('a')[0].focus();
        }
      }
    }

    ; // listener_submenu_click()
    // Listener for same page link (hash) click

    function listener_hash_click() {
      // Close the menu
      menu.setAttribute('aria-hidden', 'true');
      menu_toggle.setAttribute('aria-expanded', 'false'); // Bubble to the document

      document.body.classList.remove('menu-is-open');
    }

    ; // When "hover", this is how focus should act

    function listener_submenu_focus(e) {
      var currentTarget = e.currentTarget;
      var target = e.target;
      var parent_menu = target.parentNode;
      var sub_menu = parent_menu.querySelector('.sub-menu');
      var all_open_menu_triggers = menu.querySelectorAll('.child-has-focus > a.submenu-is-open');
      var all_open_menu_triggers_count = all_open_menu_triggers.length;
      var t;

      if (get_screen_size('has-full-nav')) {
        if (all_open_menu_triggers_count > 0) {
          // Make sure only 1 menu item can be opened at a time
          for (t = 0; t < all_open_menu_triggers_count; t = t + 1) {
            // Check if the open menu is top-level, if so, close it
            if (parent_menu.parentNode === menu) {
              menu_sub_close(all_open_menu_triggers[t]);
            }
          }
        }
      }

      menu_sub_open(target);
    }

    ; // Listener for the window resize

    var listener_window = (0,_utility_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
      if (get_screen_size('has-offscreen-nav')) {
        menu_create();
      } else {
        menu_destroy();
      }
    }, 100); // listener_window()
    // Close the menu if you click somewhere else

    function listener_close_open_menus(e) {
      var open_menus = menu.querySelectorAll('.submenu-is-open');
      var open_menus_count = open_menus.length;
      var opn; // if the event is keyup and it was the ESC key

      if (e.type === 'keyup' && e.keyCode == 27) {
        // We were getting some errors, so let's add in a checkpoint
        if (open_menus_count) {
          // Loop through all the open menus and close them
          for (opn = 0; opn < open_menus.length; opn = opn + 1) {
            menu_sub_close(open_menus[opn]);
          } // for
          // Return focus to the first open menu


          if (sub_menu_acion === 'click') {
            open_menus[0].focus();
          }
        } // if
        // If the event was a mouseup

      } else if (e.type === 'mouseup') {
        if (!menu.contains(e.target) && menu.querySelector('.submenu-is-open')) {
          // We were getting some error, so let's add in a second checkpoint
          if (open_menus_count) {
            for (opn = 0; opn < open_menus.length; opn = opn + 1) {
              menu_sub_close(open_menus[opn]);
            } // for

          }
        } // if

      }
    }

    ; // listener_close_open_menus()

    function menu_sub_close(open_item) {
      if (open_item && open_item.classList) {
        open_item.classList.remove('submenu-is-open');
        open_item.parentNode.classList.remove('child-has-focus');
      }

      if (open_item && open_item.parentNode && open_item.parentNode.querySelector('.sub-menu')) {
        open_item.parentNode.querySelector('.sub-menu').setAttribute('aria-hidden', 'true');
      }
    }

    ; // menu_sub_close()

    function menu_sub_close_all() {
      var open_menus = menu.querySelectorAll('.submenu-is-open');
      var open_menus_count = open_menus.length;
      var opn; // We were getting some errors, so let's add in a checkpoint

      if (open_menus_count) {
        // Loop through all the open menus and close them
        for (opn = 0; opn < open_menus.length; opn = opn + 1) {
          menu_sub_close(open_menus[opn]);
        } // for

      } // if

    }

    ; // menu_sub_close()

    function menu_sub_open(closed_item) {
      closed_item.classList.add('submenu-is-open');
      closed_item.parentNode.classList.add('child-has-focus');

      if (closed_item.parentNode.querySelector('.sub-menu')) {
        closed_item.parentNode.querySelector('.sub-menu').setAttribute('aria-hidden', 'false');
      }
    }

    ; // menu_sub_open()
    // Method to create the small screen menu

    function menu_create() {
      if (!document.body.classList.contains('has-offscreen-nav')) {
        if (!document.body.classList.contains('menu-is-open')) {
          menu.setAttribute('aria-hidden', 'true');
          menu_toggle.setAttribute('aria-expanded', 'false');
        } else {
          menu.setAttribute('aria-hidden', 'false');
          menu_toggle.setAttribute('aria-expanded', 'true');
        } // Loop through all submenus and bind events when needed


        for (i = 0; i < menu_items_with_children_count; i++) {
          var svgElements = menu_items_with_children[i].querySelectorAll('svg');

          for (var q = 0; q < svgElements.length; q = q + 1) {
            svgElements[q].addEventListener('click', listener_submenu_click);
          }

          menu_items_with_children[i].removeEventListener('focusin', listener_submenu_focus);
        } // for
        // Loop through all links for hash and bind events when needed


        for (i = 0; i < menu_items_links_count; i++) {
          if (menu_items_links[i].hash && menu_items_links[i].pathname === '/') {
            menu_items_links[i].addEventListener('click', listener_hash_click);
          }
        } // for
        // Bind the event


        menu_toggle.addEventListener('click', listener_menu); // Add the body class to prevent this from running again

        document.body.classList.add('has-offscreen-nav');
        document.body.classList.remove('has-full-nav');
      }
    }

    ; // menu_create()
    // Method to destroy the small screen menu

    function menu_destroy() {
      var tmp_open;
      var tmp_open_count;
      var t;

      if (!document.body.classList.contains('has-full-nav')) {
        // Remove aria-hidden, because we don't need it.
        menu.removeAttribute('aria-hidden'); // Loop through all submenus and bind events when needed

        for (i = 0; i < menu_items_with_children_count; i = i + 1) {
          if (sub_menu_acion !== 'click') {
            menu_items_with_children[i].removeEventListener('click', listener_submenu_click);
            menu_items_with_children[i].addEventListener('focusin', listener_submenu_focus);
            menu.classList.remove('uses-click');
          }
        } // If we're not using click, the open menus need to be reset


        if (sub_menu_acion !== 'click') {
          tmp_open = document.querySelectorAll('.child-has-focus');
          tmp_open_count = tmp_open.length;

          for (t = 0; t < tmp_open_count; t = t + 1) {
            tmp_open[t].classList.remove('child-has-focus');
            tmp_open[t].querySelector('.submenu-is-open').classList.remove('submenu-is-open');
            tmp_open[t].querySelector('.sub-menu').setAttribute('aria-hidden', 'true');
          }
        } // Unbind the event


        menu_toggle.removeEventListener('click', listener_menu); // Add the body class to prevent this from running again

        document.body.classList.add('has-full-nav');
        document.body.classList.remove('has-offscreen-nav');
      }
    }

    ; // Check init menu state

    if (get_screen_size('has-offscreen-nav')) {
      menu_create();
    } // If aria-controls isn't set, set it


    if (!aria_controls) {
      menu_toggle.setAttribute('aria-controls', menu_id);
    }

    if (current_menu_item) {
      current_menu_item.querySelector('a').setAttribute('aria-current', 'page');
    }
    /*
    	Events
    */
    // Debounced resize event to create and destroy the small screen menu options


    window.addEventListener('resize', listener_window); // Close the submenus by clicking off of them or hitting ESC

    document.addEventListener('mouseup', listener_close_open_menus);
    document.addEventListener('keyup', listener_close_open_menus);
    /*
    	Hiding and showing submenus (click, focus, hover)
    */
    // Loop through all items with sub menus and bind focus to them for tabbing

    for (i = 0; i < menu_items_with_children_count; i = i + 1) {
      // Let a screen reader know this menu has a submenu by hooking into the first link
      menu_items_with_children[i].querySelector('a').setAttribute('aria-haspopup', 'true'); // Hide and label each sub menu

      menu_items_with_children[i].querySelector('.sub-menu').setAttribute('aria-hidden', 'true');
      menu_items_with_children[i].querySelector('.sub-menu').setAttribute('aria-label', 'Submenu'); // If the screen is small or the action is set to click

      if (get_screen_size('has-offscreen-nav') || sub_menu_acion === 'click') {
        menu_items_with_children[i].addEventListener('click', listener_submenu_click);
        var svgElements = menu_items_with_children[i].querySelectorAll('svg');

        for (var z = 0; z < svgElements.length; z = z + 1) {
          svgElements[z].addEventListener('click', listener_submenu_click);
          svgElements[z].addEventListener('keypress', e => {
            ['Space', 'Enter'].includes(e.code) && listener_submenu_click(e);
          });
          svgElements[z].setAttribute('tabindex', '0');
        }

        menu.classList.add(sub_menu_acion === 'click' ? 'uses-click' : 'uses-hover');
      } else if (sub_menu_acion !== 'click') {
        if (get_screen_size('has-full-nav')) {
          menu_items_with_children[i].addEventListener('mouseover', listener_submenu_focus);
          menu_items_with_children[i].addEventListener('mouseout', function () {
            var open_menus = menu.querySelectorAll('.submenu-is-open');
            var open_menus_count = open_menus.length;
            var opn; // We were getting some errors, so let's add in a checkpoint

            if (open_menus_count) {
              // Loop through all the open menus and close them
              for (opn = 0; opn < open_menus_count; opn = opn + 1) {
                menu_sub_close(open_menus[opn]);
              } // for

            }
          });
          menu_items_with_children[i].addEventListener('focusin', listener_submenu_focus);
          menu_items_with_children[i].querySelectorAll('.sub-menu').forEach(submenu => {
            submenu.addEventListener('mouseover', event => {
              submenu.parentElement.classList.add('child-has-focus');
              submenu.previousElementSibling.classList.add('submenu-is-open');
            }, false);
          });
        } // if

      } // if

    } // for
    // Execute the callback function


    if (typeof callback === 'function') {
      callback.call();
    }
  }; // build_menu()

  /*
  	Helper functions
  */
  // Get screen size from getComputedStyle (so we don't have to define each breakpoint twice) -- Values are set in CSS --


  function get_screen_size(sizeString) {
    var size = window.getComputedStyle(document.body, ':before').getPropertyValue('content');

    if (size && size.indexOf(sizeString) !== -1) {
      return true;
    }
  }

  ;
})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************************************!*\
  !*** ./.dev/assets/shared/js/frontend/frontend.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/debounce */ "./.dev/assets/shared/js/frontend/utility/debounce.js");
/* harmony import */ var _components_primary_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/primary-menu.js */ "./.dev/assets/shared/js/frontend/components/primary-menu.js");
/* harmony import */ var _components_search_toggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/search-toggle.js */ "./.dev/assets/shared/js/frontend/components/search-toggle.js");
/* harmony import */ var _components_woo_menu_cart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/woo-menu-cart.js */ "./.dev/assets/shared/js/frontend/components/woo-menu-cart.js");




(0,_components_primary_menu_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_components_search_toggle_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_components_woo_menu_cart_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
document.addEventListener('DOMContentLoaded', function () {
  const hasSelectiveRefresh = 'undefined' !== typeof wp && wp.customize && wp.customize.selectiveRefresh && wp.customize.navMenusPreview.NavMenuInstancePartial; // partial-content-rendered might render multiple times for some reason, let's make sure to debouce this.

  const init = (0,_utility_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
    // we need to remove this before calling primary menu again.
    document.body.classList.remove('has-offscreen-nav');
    (0,_components_primary_menu_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_components_search_toggle_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  }, 1000);

  if (hasSelectiveRefresh) {
    wp.customize.selectiveRefresh.bind('partial-content-rendered', function (placement) {
      const changedHeaderVariation = placement && 'null' !== placement.container[0].parentNode && 'header_variation' === placement.partial.id;

      if (changedHeaderVariation) {
        init();
      }
    });
  }
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvZnJvbnRlbmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBS0E7QUFDQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDakNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBRUE7O0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7O0FBR0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTs7QUFHQTtBQUNBO0FBRUE7O0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBOztBQUFBOztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUFBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUVBOztBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBRUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0E7O0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBRUE7QUFDQTs7QUFHQTtBQUNBOztBQUdBO0FBQ0E7QUFFQTs7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBRUE7QUFDQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFFQTs7Ozs7O0FDbGRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ28vLi8uZGV2L2Fzc2V0cy9zaGFyZWQvanMvZnJvbnRlbmQvY29tcG9uZW50cy9wcmltYXJ5LW1lbnUuanMiLCJ3ZWJwYWNrOi8vZ28vLi8uZGV2L2Fzc2V0cy9zaGFyZWQvanMvZnJvbnRlbmQvY29tcG9uZW50cy9zZWFyY2gtdG9nZ2xlLmpzIiwid2VicGFjazovL2dvLy4vLmRldi9hc3NldHMvc2hhcmVkL2pzL2Zyb250ZW5kL2NvbXBvbmVudHMvd29vLW1lbnUtY2FydC5qcyIsIndlYnBhY2s6Ly9nby8uLy5kZXYvYXNzZXRzL3NoYXJlZC9qcy9mcm9udGVuZC91dGlsaXR5L2RlYm91bmNlLmpzIiwid2VicGFjazovL2dvLy4vLmRldi9hc3NldHMvc2hhcmVkL2pzL2Zyb250ZW5kL3ZlbmRvci9yZXNwb25zaXZlLW5hdi5qcyIsIndlYnBhY2s6Ly9nby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dvLy4vLmRldi9hc3NldHMvc2hhcmVkL2pzL2Zyb250ZW5kL2Zyb250ZW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBUZW5VcCAqL1xuaW1wb3J0ICcuLi92ZW5kb3IvcmVzcG9uc2l2ZS1uYXYnO1xuXG4vKipcbiAqIEhvb2sgdXAgbmF2aWdhdGlvbi5cbiAqL1xuY29uc3QgaW5pdCA9ICgpID0+IHtcblx0aWYgKCBUZW5VcCApIHtcblx0XHRUZW5VcC5uYXZpZ2F0aW9uKCB7XG5cdFx0XHR0YXJnZXQ6ICcjaGVhZGVyX19uYXZpZ2F0aW9uJyxcblx0XHRcdHRvZ2dsZTogJyNuYXYtdG9nZ2xlJyxcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXHRcdFx0c3ViX21lbnVfb3BlbjogZ29Gcm9udGVuZC5vcGVuTWVudU9uSG92ZXIgPyAnaG92ZXInIDogJ2NsaWNrJ1xuXHRcdH0gKTtcblx0fVxuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgbG9ja01lbnVGb2N1cyApO1xufTtcblxuLyoqXG4gKiBMb2NrIHRhYmJpbmcgdG8gdGhlIG1haW4gbmF2aWdhdGlvbiBvbmx5LlxuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqL1xuZnVuY3Rpb24gbG9ja01lbnVGb2N1cyggZSApIHtcblx0aWYgKCBbICdTcGFjZScsICdFbnRlcicsICdUYWInIF0uaW5jbHVkZXNbIGUuY29kZSBdIHx8ICEgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2JvZHknICkuY2xhc3NMaXN0LmNvbnRhaW5zKCAnbWVudS1pcy1vcGVuJyApICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnOmZvY3VzJyApO1xuXHRjb25zdCBpc1NoaWZ0VGFiID0gKCBlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gJ1RhYicgKTtcblxuXHRpZiAoIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCAnaWQnICkgPT09ICduYXYtdG9nZ2xlJyApIHtcblx0XHRpZiAoIGlzU2hpZnRUYWIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ3VsLnByaW1hcnktbWVudSBsaTpmaXJzdC1jaGlsZCBhJyApWyAwIF0uZm9jdXMoKTtcblx0XHR9LCAxMCApO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG4iLCJjb25zdCBzZWFyY2hUb2dnbGUgPSAoKSA9PiB7XG5cdGNvbnN0IHNlYXJjaFRvZ2dsZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdoZWFkZXJfX3NlYXJjaC10b2dnbGUnICk7XG5cblx0aWYgKCAhIHNlYXJjaFRvZ2dsZUVsICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHBlcmZvcm1Ub2dnbGUgPSAoIGVsZW1lbnQgKSA9PiB7XG5cdFx0Y29uc3QgdG9nZ2xlID0gZWxlbWVudDtcblx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCB0b2dnbGUuZGF0YXNldC50b2dnbGVUYXJnZXQgKTtcblxuXHRcdGlmICggdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ3Nob3ctbW9kYWwnICkgKSB7XG5cdFx0XHQvLyBIaWRlIHRoZSBtb2RhbC5cblx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCAnc2hvdy1tb2RhbCcgKTtcblx0XHRcdFx0dG9nZ2xlLmZvY3VzKCk7XG5cdFx0XHR9LCAyNTAgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gU2hvdyB0aGUgbW9kYWwuXG5cdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCggJ3Nob3ctbW9kYWwnICk7XG5cblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoICdhY3RpdmUnICk7XG5cblx0XHRcdFx0aWYgKCB0b2dnbGUuZGF0YXNldC5zZXRGb2N1cyApIHtcblx0XHRcdFx0XHRjb25zdCBmb2N1c0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCB0b2dnbGUuZGF0YXNldC5zZXRGb2N1cyApO1xuXG5cdFx0XHRcdFx0aWYgKCBmb2N1c0VsZW1lbnQgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzZWFyY2hUZXJtID0gZm9jdXNFbGVtZW50LnZhbHVlO1xuXHRcdFx0XHRcdFx0Zm9jdXNFbGVtZW50LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0XHRmb2N1c0VsZW1lbnQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdGZvY3VzRWxlbWVudC52YWx1ZSA9IHNlYXJjaFRlcm07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LCAxMCApO1xuXHRcdH1cblx0fTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnKltkYXRhLXRvZ2dsZS10YXJnZXRdJyApLmZvckVhY2goICggZWxlbWVudCApID0+IHtcblx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICggZXZlbnQgKSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0cGVyZm9ybVRvZ2dsZSggZWxlbWVudCApO1xuXHRcdH0gKTtcblx0fSApO1xuXG5cdC8vIENsb3NlIG1vZGFsIG9uIGVzY2FwZSBrZXkgcHJlc3MuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZXZlbnQgKSA9PiB7XG5cdFx0aWYgKCBldmVudC5rZXlDb2RlID09PSAyNyApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnNlYXJjaC1tb2RhbC5hY3RpdmUnICkuZm9yRWFjaCggKCBlbGVtZW50ICkgPT4ge1xuXHRcdFx0XHRwZXJmb3JtVG9nZ2xlKFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcqW2RhdGEtdG9nZ2xlLXRhcmdldD1cIicgKyBlbGVtZW50LmRhdGFzZXQubW9kYWxUYXJnZXRTdHJpbmcgKyAnXCJdJyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0Ly8gQ2xvc2UgbW9kYWwgb24gb3V0c2lkZSBjbGljay5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgKCBldmVudCApID0+IHtcblx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cdFx0Y29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLnNlYXJjaC1tb2RhbC5hY3RpdmUnICk7XG5cblx0XHRpZiAoIHRhcmdldCA9PT0gbW9kYWwgKSB7XG5cdFx0XHRwZXJmb3JtVG9nZ2xlKFxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnKltkYXRhLXRvZ2dsZS10YXJnZXQ9XCInICsgbW9kYWwuZGF0YXNldC5tb2RhbFRhcmdldFN0cmluZyArICdcIl0nIClcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBsb2NrU2VhcmNoRm9jdXMgKTtcbn07XG5cbi8qKlxuICogTG9jayB0YWJiaW5nIHRvIHRoZSBzZWFyY2ggZm9ybSBvbmx5LlxuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqL1xuZnVuY3Rpb24gbG9ja1NlYXJjaEZvY3VzKCBlICkge1xuXHQvLyBJZiB0aGUga2V5cHJlc3MgaXNuJ3QgYSB0YWIgb3IgdGhlIHNlYXJjaCBmb3JtIGlzbid0IGFjdGl2ZSwgcmV0dXJuXG5cdGlmICggZS5rZXlDb2RlICE9PSA5IHx8ICEgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5zaXRlLXNlYXJjaC5hY3RpdmUnICkgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3VycmVudCBhY3RpdmUgZWxlbWVudCBiZWZvcmUgaXQgbW92ZXNcblx0Y29uc3QgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cblx0Ly8gSWYgd2UncmUgb24gdGhlIGlucHV0IGFuZCBzaGlmdCt0YWIgd2FzIHByZXNzZWQsIG92ZXJyaWRlIGFuZCBmb2N1cyBvbiBidXR0b24uXG5cdGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoICdzZWFyY2gtZm9ybV9faW5wdXQnICkgJiYgZS5zaGlmdEtleSApIHtcblx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIEZvY3VzIHRoZSBjb3JyZWN0IGJ1dHRvbiBieSBvbmx5IGxvb2tpbmcgZm9yIGl0IGluIHRoZSBwYXJlbnQgZWxlbWVudFxuXHRcdFx0YWN0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoICdzZWFyY2gtaW5wdXRfX2J1dHRvbicgKS5pdGVtKCAwICkuZm9jdXMoKTtcblx0XHR9LCAxMCApO1xuXHR9XG5cblx0Ly8gSWYgd2UncmUgb24gdGhlIGJ1dHRvbiBhbmQgdGFiIHdhcyBwcmVzc2VkLCBvdmVycmlkZSBhbmQgZm9jdXMgb24gaW5wdXQuXG5cdGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoICdzZWFyY2gtaW5wdXRfX2J1dHRvbicgKSAmJiAhIGUuc2hpZnRLZXkgKSB7XG5cdFx0c2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBGb2N1cyB0aGUgY29ycmVjdCBpbnB1dCBieSBvbmx5IGxvb2tpbmcgZm9yIGl0IGluIHRoZSBwYXJlbnQgZWxlbWVudFxuXHRcdFx0YWN0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoICdzZWFyY2gtZm9ybV9faW5wdXQnICkuaXRlbSggMCApLmZvY3VzKCk7XG5cdFx0fSwgMTAgKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWFyY2hUb2dnbGU7XG4iLCJjb25zdCBtZW51T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdoZWFkZXJfX2NhcnQtdG9nZ2xlJyApO1xuY29uc3Qgc2l0ZU92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NpdGUtb3ZlcmxheScgKTtcbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NpdGUtbmF2LS1jYXJ0JyApO1xuY29uc3Qgc2lkZU5hdkNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzaXRlLWNsb3NlLWhhbmRsZScgKTtcblxuY29uc3Qgd29vTWVudUNhcnQgPSAoKSA9PiB7XG5cdGlmIChcblx0XHRudWxsID09PSBtZW51T2JqZWN0IHx8XG5cdFx0bnVsbCA9PT0gc2l0ZU92ZXJsYXkgfHxcblx0XHRudWxsID09PSBzaWRlTmF2Q2xvc2Vcblx0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCAnaGFzLXdvby1jYXJ0LXNsaWRlb3V0JyApO1xuXG5cdG1lbnVPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dG9nZ2xlU2lkZU5hdlZpc2liaWxpdHkoKTtcblx0fSApO1xuXG5cdHNpdGVPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRvZ2dsZVNpZGVOYXZWaXNpYmlsaXR5ICk7XG5cdHNpZGVOYXZDbG9zZS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0b2dnbGVTaWRlTmF2VmlzaWJpbGl0eSApO1xufTtcblxuY29uc3QgdG9nZ2xlU2lkZU5hdlZpc2liaWxpdHkgPSAoKSA9PiB7XG5cdHNpZGVOYXYuY2xhc3NMaXN0LnRvZ2dsZSggJ2FjdGl2ZScgKTtcblx0c2l0ZU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSggJ2FjdGl2ZScgKTtcblx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCAnc2lkZWJhci1tb3ZlJyApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd29vTWVudUNhcnQ7XG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jICAgICAgRnVudGlvbiB0byBydW4gYWdhaW5zdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSAgIHdhaXQgICAgICBBbW91bnQgdG8gd2FpdFxuICogQHBhcmFtIHtib29sZWFufSAgaW1tZWRpYXRlIFRyaWdnZXIgb24gbGVhZGluZyBlZGdlP1xuICovXG5jb25zdCBkZWJvdW5jZSA9ICggZnVuYywgd2FpdCwgaW1tZWRpYXRlICkgPT4ge1xuXHRsZXQgdGltZW91dDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBjb250ZXh0ID0gdGhpcztcblxuXHRcdC8qKlxuXHRcdCAqIExhdGVyXG5cdFx0ICovXG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGlmICggISBpbW1lZGlhdGUgKSB7XG5cdFx0XHRcdGZ1bmMuYXBwbHkoIGNvbnRleHQsIGFyZ3MgKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhIHRpbWVvdXQ7XG5cblx0XHRjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCggbGF0ZXIsIHdhaXQgKTtcblx0XHRpZiAoIGNhbGxOb3cgKSB7XG5cdFx0XHRmdW5jLmFwcGx5KCBjb250ZXh0LCBhcmdzICk7XG5cdFx0fVxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVib3VuY2U7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSBcIi4uL3V0aWxpdHkvZGVib3VuY2VcIjtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cblx0TmFtZTogV29yZFByZXNzIEFjY2Vzc2libGUgUmVzcG9uc2l2ZSBOYXZpZ2F0aW9uIE1lbnVcblx0VXNhZ2U6XG5cblx0VGVuVXAuYnVpbGRfbWVudSh7XG5cblx0XHQndGFyZ2V0J1x0XHQ6XHQnI3ByaW1hcnktbmF2JywgICAgICAvLyB0aGUgc2VsZWN0b3Igb2YgdGhlIG5hdiBtZW51IDx1bD5cblx0XHQndG9nZ2xlJ1x0XHQ6XHQnI2pzLW1lbnUtdG9nZ2xlJywgICAvLyB0aGUgSUQgb2YgdGhlIGxpbmsgeW91J3JlIHVzaW5nIHRvIG9wZW4vY2xvc2UgdGhlIHNtYWxsIHNjcmVlbiBtZW51XG5cdFx0J3N1Yl9tZW51X29wZW4nXHQ6XHQnaG92ZXInXG5cblx0fSwgZnVuY3Rpb24oKSB7XG5cblx0XHRjb25zb2xlLmxvZygnQW1hemluZyBjYWxsYmFjayBmdW5jdGlvbiEnKTtcblxuXHR9KTtcblxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuKCBmdW5jdGlvbigpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gRGVmaW5lIGdsb2JhbCBUZW5VcCBvYmplY3QgaWYgaXQgZG9lc24ndCBleGlzdFxuXHRpZiAoICdvYmplY3QnICE9PSB0eXBlb2Ygd2luZG93LlRlblVwICkge1xuXHRcdHdpbmRvdy5UZW5VcCA9IHt9O1xuXHR9XG5cblx0Lypcblx0XHRDYWNoZSBhbmQgZGVmaW5lIHNvbWUgdmFyaWFibGVzXG5cdCovXG5cblx0Ly8gaW5pdCBmdW5jdGlvblxuXHRUZW5VcC5uYXZpZ2F0aW9uID0gZnVuY3Rpb24oIG9wdGlvbnMsIGNhbGxiYWNrICkge1xuXG5cdFx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdFx0J3RhcmdldCdcdFx0Olx0JyNwcmltYXJ5LW5hdicsXG5cdFx0XHQndG9nZ2xlJ1x0XHQ6XHQnI2pzLW1lbnUtdG9nZ2xlJyxcblx0XHRcdCdzdWJfbWVudV9vcGVuJ1x0Olx0J2hvdmVyJ1xuXHRcdH07XG5cdFx0dmFyIG9wdDtcblxuXHRcdC8vIE1hcCBhbGwgZGVmYXVsdCBzZXR0aW5ncyB0byB1c2VyIGRlZmluZWQgb3B0aW9ucyBpZiB0aGV5IGV4aXN0XG5cdFx0Zm9yICggb3B0ID0gMDsgb3B0IDwgZGVmYXVsdHMubGVuZ3RoOyBvcHQgPSBvcHQgKyAxICkge1xuXG5cdFx0XHRpZiggdHlwZW9mIG9wdGlvbnNbb3B0XSA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdG9wdGlvbnNbb3B0XSA9IGRlZmF1bHRzW29wdF07XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHR2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIG9wdGlvbnMudGFyZ2V0ICk7XG5cblx0XHQvLyBCYWlsIG91dCBpZiB0aGVyZSdzIG5vIG1lbnVcblx0XHRpZiAoICEgbWVudSApIHsgcmV0dXJuOyB9XG5cblx0XHR2YXIgbWVudV9pZCA9IG1lbnUuZ2V0QXR0cmlidXRlKCAnaWQnICk7XG5cdFx0dmFyIG1lbnVfdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggb3B0aW9ucy50b2dnbGUgKTtcblx0XHR2YXIgYXJpYV9jb250cm9scyA9IG1lbnVfdG9nZ2xlLmdldEF0dHJpYnV0ZSggJ2FyaWEtY29udHJvbHMnICk7XG5cdFx0dmFyIHN1Yl9tZW51X2FjaW9uID0gb3B0aW9ucy5zdWJfbWVudV9vcGVuO1xuXHRcdHZhciBjdXJyZW50X21lbnVfaXRlbSA9IG1lbnUucXVlcnlTZWxlY3RvciggJy5jdXJyZW50LW1lbnUtaXRlbScgKTtcblx0XHR2YXIgbWVudV9pdGVtc19saW5rcyA9IG1lbnUucXVlcnlTZWxlY3RvckFsbCggJy5tZW51LWl0ZW0gPiBhJyApO1xuXHRcdHZhciBtZW51X2l0ZW1zX2xpbmtzX2NvdW50ID0gbWVudV9pdGVtc19saW5rcy5sZW5ndGg7XG5cdFx0dmFyIG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbiA9IG1lbnUucXVlcnlTZWxlY3RvckFsbCggJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApO1xuXHRcdHZhciBtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5fY291bnQgPSBtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdHZhciBjdXJyZW50VGFyZ2V0O1xuXHRcdHZhciB0YXJnZXQ7XG5cdFx0dmFyIGk7XG5cblx0XHQvLyBMaXN0ZW5lciBmb3IgdGhlIG1lbnUgb3Blbi9jbG9zZSBhY3Rpb25cblx0XHRmdW5jdGlvbiBsaXN0ZW5lcl9tZW51KCBlICkge1xuXG5cdFx0XHQvLyBTdG9wIGxpbmtzIGZyb20gZmlyaW5nXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmICggZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoICdtZW51LWlzLW9wZW4nICkgKSB7XG5cdFx0XHRcdC8vIENsb3NlIHRoZSBtZW51XG5cdFx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcblx0XHRcdFx0bWVudV90b2dnbGUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblxuXHRcdFx0XHQvLyBCdWJibGUgdG8gdGhlIGRvY3VtZW50XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSggJ21lbnUtaXMtb3BlbicgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE9wZW4gdGhlIG1lbnVcblx0XHRcdFx0bWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICdmYWxzZScgKTtcblx0XHRcdFx0bWVudV90b2dnbGUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApO1xuXG5cdFx0XHRcdC8vIFNldCBmb2N1cyB0byB0aGUgZmlyc3QgbGlua1xuXHRcdFx0XHRtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoICdhJyApWzBdLmZvY3VzKCk7XG5cblx0XHRcdFx0Ly8gQnViYmxlIHRvIHRoZSBkb2N1bWVudFxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoICdtZW51LWlzLW9wZW4nICk7XG5cdFx0XHR9XG5cblx0XHR9OyAvLyBsaXN0ZW5lcl9tZW51KClcblxuXHRcdC8vIExpc3RlbmVyIGZvciBzdWJtZW51IG9uIGNsaWNrXG5cdFx0ZnVuY3Rpb24gbGlzdGVuZXJfc3VibWVudV9jbGljayggZSApIHtcblxuXHRcdFx0Y3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdHRhcmdldCA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoIHRhcmdldC50YWdOYW1lID09PSAnc3ZnJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ3BhdGgnICkge1xuXHRcdFx0XHR0YXJnZXQgPSBjdXJyZW50VGFyZ2V0LmNsb3Nlc3QoICcubWVudS1pdGVtID4gYScgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCB0YXJnZXQucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZy5ocmVmICk7XG5cdFx0XHRcdGlmICggZ29Gcm9udGVuZC5pc01vYmlsZSApIHtcblx0XHRcdFx0XHRpZiAoIHRhcmdldC50YWdOYW1lID09PSAnQScgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggdGFyZ2V0LnRhZ05hbWUgPT09ICdVTCcgKSB7XG5cdFx0XHRcdFx0XHRsZXQgdGVtcFVSTCA9IHRhcmdldC5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nLmhyZWY7XG5cdFx0XHRcdFx0XHRpZiAoIG51bGwgIT09IHRlbXBVUkwgKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGVtcFVSTDtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRhcmdldC5nZXRBdHRyaWJ1dGUoICdhcmlhLWhhc3BvcHVwJyApICkge1xuXHRcdFx0XHQvLyBTdG9wIGxpbmtzIGZyb20gZmlyaW5nXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHQvLyBTdG9wIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHVwIHRvIHBhcmVudCBlbGVtZW50c1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdHZhciBwYXJlbnRfbWVudSA9IHRhcmdldC5wYXJlbnROb2RlO1xuXHRcdFx0XHR2YXIgc3ViX21lbnUgPSBwYXJlbnRfbWVudS5xdWVyeVNlbGVjdG9yKCAnLnN1Yi1tZW51JyApO1xuXHRcdFx0XHR2YXIgYWxsX29wZW5fbWVudXMgPSBtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoICcuY2hpbGQtaGFzLWZvY3VzJyApO1xuXHRcdFx0XHR2YXIgYWxsX29wZW5fbWVudXNfY291bnQgPSBhbGxfb3Blbl9tZW51cy5sZW5ndGg7XG5cdFx0XHRcdHZhciBhbGxfb3Blbl9tZW51X3RyaWdnZXJzID0gbWVudS5xdWVyeVNlbGVjdG9yQWxsKCAnLmNoaWxkLWhhcy1mb2N1cyA+IGEuc3VibWVudS1pcy1vcGVuJyApO1xuXHRcdFx0XHR2YXIgYWxsX29wZW5fbWVudV90cmlnZ2Vyc19jb3VudCA9IGFsbF9vcGVuX21lbnVfdHJpZ2dlcnMubGVuZ3RoO1xuXHRcdFx0XHR2YXIgdDtcblxuXHRcdFx0XHRpZiAoIGdldF9zY3JlZW5fc2l6ZSggJ2hhcy1mdWxsLW5hdicgKSApIHtcblx0XHRcdFx0XHRpZiAoIGFsbF9vcGVuX21lbnVfdHJpZ2dlcnNfY291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIG9ubHkgMSBtZW51IGl0ZW0gY2FuIGJlIG9wZW5lZCBhdCBhIHRpbWVcblx0XHRcdFx0XHRcdGZvciAoIHQgPSAwOyB0IDwgYWxsX29wZW5fbWVudV90cmlnZ2Vyc19jb3VudDsgdCA9IHQgKyAxICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoZSBvcGVuIG1lbnUgaXMgdG9wLWxldmVsLCBpZiBzbywgY2xvc2UgaXRcblx0XHRcdFx0XHRcdFx0aWYgKCBwYXJlbnRfbWVudS5wYXJlbnROb2RlID09PSBtZW51ICkge1xuXHRcdFx0XHRcdFx0XHRcdG1lbnVfc3ViX2Nsb3NlKCBhbGxfb3Blbl9tZW51X3RyaWdnZXJzW3RdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gLy8gZm9yXG5cdFx0XHRcdFx0fSAvLyBpZlxuXHRcdFx0XHR9IC8vIGlmXG5cblx0XHRcdFx0aWYgKCAoIGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnQScgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdBJyApICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdzdWJtZW51LWlzLW9wZW4nICkgKSB7XG5cdFx0XHRcdFx0Ly8gVGhlIG1lbnUgaXMgYWxyZWFkeSBvcGVuLCBzbyB0aGlzIHNob3VsZCBiZSBhIGNsb3NlIGFjdGlvblxuXHRcdFx0XHRcdG1lbnVfc3ViX2Nsb3NlKCB0YXJnZXQgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51X3N1Yl9jbG9zZV9hbGwoKTtcblx0XHRcdFx0XHQvLyBUaGUgbWVudSBpcyBjbG9zZWQsIHNvIHRoaXMgY2xpY2sgc2hvdWxkIG9wZW4gaXRcblx0XHRcdFx0XHRtZW51X3N1Yl9vcGVuKCB0YXJnZXQgKTtcblxuXHRcdFx0XHRcdC8vIFJlc2V0IHRoZSBmb2N1c1xuXHRcdFx0XHRcdHN1Yl9tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVswXS5mb2N1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTsgLy8gbGlzdGVuZXJfc3VibWVudV9jbGljaygpXG5cblx0XHQvLyBMaXN0ZW5lciBmb3Igc2FtZSBwYWdlIGxpbmsgKGhhc2gpIGNsaWNrXG5cdFx0ZnVuY3Rpb24gbGlzdGVuZXJfaGFzaF9jbGljaygpIHtcblxuXHRcdFx0Ly8gQ2xvc2UgdGhlIG1lbnVcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcblx0XHRcdG1lbnVfdG9nZ2xlLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XG5cblx0XHRcdC8vIEJ1YmJsZSB0byB0aGUgZG9jdW1lbnRcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSggJ21lbnUtaXMtb3BlbicgKTtcblx0XHR9O1xuXG5cdFx0Ly8gV2hlbiBcImhvdmVyXCIsIHRoaXMgaXMgaG93IGZvY3VzIHNob3VsZCBhY3Rcblx0XHRmdW5jdGlvbiBsaXN0ZW5lcl9zdWJtZW51X2ZvY3VzKCBlICkge1xuXG5cdFx0XHR2YXIgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdHZhciBwYXJlbnRfbWVudSA9IHRhcmdldC5wYXJlbnROb2RlO1xuXHRcdFx0dmFyIHN1Yl9tZW51ID0gcGFyZW50X21lbnUucXVlcnlTZWxlY3RvciggJy5zdWItbWVudScgKTtcblx0XHRcdHZhciBhbGxfb3Blbl9tZW51X3RyaWdnZXJzID0gbWVudS5xdWVyeVNlbGVjdG9yQWxsKCAnLmNoaWxkLWhhcy1mb2N1cyA+IGEuc3VibWVudS1pcy1vcGVuJyApO1xuXHRcdFx0dmFyIGFsbF9vcGVuX21lbnVfdHJpZ2dlcnNfY291bnQgPSBhbGxfb3Blbl9tZW51X3RyaWdnZXJzLmxlbmd0aDtcblx0XHRcdHZhciB0O1xuXG5cdFx0XHRpZiAoIGdldF9zY3JlZW5fc2l6ZSggJ2hhcy1mdWxsLW5hdicgKSApIHtcblx0XHRcdFx0aWYgKCBhbGxfb3Blbl9tZW51X3RyaWdnZXJzX2NvdW50ID4gMCApIHtcblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgb25seSAxIG1lbnUgaXRlbSBjYW4gYmUgb3BlbmVkIGF0IGEgdGltZVxuXHRcdFx0XHRcdGZvciAoIHQgPSAwOyB0IDwgYWxsX29wZW5fbWVudV90cmlnZ2Vyc19jb3VudDsgdCA9IHQgKyAxICkge1xuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIG9wZW4gbWVudSBpcyB0b3AtbGV2ZWwsIGlmIHNvLCBjbG9zZSBpdFxuXHRcdFx0XHRcdFx0aWYgKCBwYXJlbnRfbWVudS5wYXJlbnROb2RlID09PSBtZW51ICkge1xuXHRcdFx0XHRcdFx0XHRtZW51X3N1Yl9jbG9zZSggYWxsX29wZW5fbWVudV90cmlnZ2Vyc1t0XSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVudV9zdWJfb3BlbiggdGFyZ2V0ICk7XG5cdFx0fTtcblxuXHRcdC8vIExpc3RlbmVyIGZvciB0aGUgd2luZG93IHJlc2l6ZVxuXHRcdHZhciBsaXN0ZW5lcl93aW5kb3cgPSBkZWJvdW5jZSggZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRpZiggZ2V0X3NjcmVlbl9zaXplKCAnaGFzLW9mZnNjcmVlbi1uYXYnICkgKSB7XG5cdFx0XHRcdG1lbnVfY3JlYXRlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZW51X2Rlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9LCAxMDAgKTsgLy8gbGlzdGVuZXJfd2luZG93KClcblxuXHRcdC8vIENsb3NlIHRoZSBtZW51IGlmIHlvdSBjbGljayBzb21ld2hlcmUgZWxzZVxuXHRcdGZ1bmN0aW9uIGxpc3RlbmVyX2Nsb3NlX29wZW5fbWVudXMoIGUgKSB7XG5cblx0XHRcdHZhciBvcGVuX21lbnVzID0gbWVudS5xdWVyeVNlbGVjdG9yQWxsKCcuc3VibWVudS1pcy1vcGVuJyk7XG5cdFx0XHR2YXIgb3Blbl9tZW51c19jb3VudCA9IG9wZW5fbWVudXMubGVuZ3RoO1xuXHRcdFx0dmFyIG9wbjtcblxuXHRcdFx0Ly8gaWYgdGhlIGV2ZW50IGlzIGtleXVwIGFuZCBpdCB3YXMgdGhlIEVTQyBrZXlcblx0XHRcdGlmICggZS50eXBlID09PSAna2V5dXAnICYmIGUua2V5Q29kZSA9PSAyNyApIHtcblxuXHRcdFx0XHQvLyBXZSB3ZXJlIGdldHRpbmcgc29tZSBlcnJvcnMsIHNvIGxldCdzIGFkZCBpbiBhIGNoZWNrcG9pbnRcblx0XHRcdFx0aWYgKCBvcGVuX21lbnVzX2NvdW50ICkge1xuXG5cdFx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgb3BlbiBtZW51cyBhbmQgY2xvc2UgdGhlbVxuXHRcdFx0XHRcdGZvciAoIG9wbiA9IDA7IG9wbiA8IG9wZW5fbWVudXMubGVuZ3RoOyBvcG4gPSBvcG4gKyAxICkge1xuXG5cdFx0XHRcdFx0XHRtZW51X3N1Yl9jbG9zZSggb3Blbl9tZW51c1tvcG5dICk7XG5cblx0XHRcdFx0XHR9IC8vIGZvclxuXG5cdFx0XHRcdFx0Ly8gUmV0dXJuIGZvY3VzIHRvIHRoZSBmaXJzdCBvcGVuIG1lbnVcblx0XHRcdFx0XHRpZiAoIHN1Yl9tZW51X2FjaW9uID09PSAnY2xpY2snICkge1xuXHRcdFx0XHRcdFx0b3Blbl9tZW51c1swXS5mb2N1cygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IC8vIGlmXG5cblx0XHRcdC8vIElmIHRoZSBldmVudCB3YXMgYSBtb3VzZXVwXG5cdFx0XHR9IGVsc2UgaWYgKCBlLnR5cGUgPT09ICdtb3VzZXVwJyApIHtcblxuXHRcdFx0XHRpZiAoICEgbWVudS5jb250YWlucyggZS50YXJnZXQgKSAmJiBtZW51LnF1ZXJ5U2VsZWN0b3IoICcuc3VibWVudS1pcy1vcGVuJyApICkge1xuXHRcdFx0XHRcdC8vIFdlIHdlcmUgZ2V0dGluZyBzb21lIGVycm9yLCBzbyBsZXQncyBhZGQgaW4gYSBzZWNvbmQgY2hlY2twb2ludFxuXHRcdFx0XHRcdGlmICggb3Blbl9tZW51c19jb3VudCApIHtcblx0XHRcdFx0XHRcdGZvciggb3BuID0gMDsgb3BuIDwgb3Blbl9tZW51cy5sZW5ndGg7IG9wbiA9IG9wbiArIDEgKSB7XG5cdFx0XHRcdFx0XHRcdG1lbnVfc3ViX2Nsb3NlKCBvcGVuX21lbnVzW29wbl0gKTtcblx0XHRcdFx0XHRcdH0gLy8gZm9yXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IC8vIGlmXG5cdFx0XHR9XG5cdFx0fTsgLy8gbGlzdGVuZXJfY2xvc2Vfb3Blbl9tZW51cygpXG5cblx0XHRmdW5jdGlvbiBtZW51X3N1Yl9jbG9zZSggb3Blbl9pdGVtICkge1xuXHRcdFx0aWYgKCBvcGVuX2l0ZW0gJiYgb3Blbl9pdGVtLmNsYXNzTGlzdCApIHtcblx0XHRcdFx0b3Blbl9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Ym1lbnUtaXMtb3BlbicpO1xuXHRcdFx0XHRvcGVuX2l0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjaGlsZC1oYXMtZm9jdXMnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBvcGVuX2l0ZW0gJiYgb3Blbl9pdGVtLnBhcmVudE5vZGUgJiYgb3Blbl9pdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggJy5zdWItbWVudScgKSApIHtcblx0XHRcdFx0b3Blbl9pdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggJy5zdWItbWVudScgKS5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xuXHRcdFx0fVxuXHRcdH07IC8vIG1lbnVfc3ViX2Nsb3NlKClcblxuXHRcdGZ1bmN0aW9uIG1lbnVfc3ViX2Nsb3NlX2FsbCgpIHtcblx0XHRcdHZhciBvcGVuX21lbnVzID0gbWVudS5xdWVyeVNlbGVjdG9yQWxsKCAnLnN1Ym1lbnUtaXMtb3BlbicgKTtcblx0XHRcdHZhciBvcGVuX21lbnVzX2NvdW50ID0gb3Blbl9tZW51cy5sZW5ndGg7XG5cdFx0XHR2YXIgb3BuO1xuXHRcdFx0Ly8gV2Ugd2VyZSBnZXR0aW5nIHNvbWUgZXJyb3JzLCBzbyBsZXQncyBhZGQgaW4gYSBjaGVja3BvaW50XG5cdFx0XHRpZiAoIG9wZW5fbWVudXNfY291bnQgKSB7XG5cdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIG9wZW4gbWVudXMgYW5kIGNsb3NlIHRoZW1cblx0XHRcdFx0Zm9yICggb3BuID0gMDsgb3BuIDwgb3Blbl9tZW51cy5sZW5ndGg7IG9wbiA9IG9wbiArIDEgKSB7XG5cdFx0XHRcdFx0bWVudV9zdWJfY2xvc2UoIG9wZW5fbWVudXNbb3BuXSApO1xuXHRcdFx0XHR9IC8vIGZvclxuXHRcdFx0fSAvLyBpZlxuXHRcdH07IC8vIG1lbnVfc3ViX2Nsb3NlKClcblxuXHRcdGZ1bmN0aW9uIG1lbnVfc3ViX29wZW4oIGNsb3NlZF9pdGVtICkge1xuXHRcdFx0Y2xvc2VkX2l0ZW0uY2xhc3NMaXN0LmFkZCggJ3N1Ym1lbnUtaXMtb3BlbicgKTtcblx0XHRcdGNsb3NlZF9pdGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCggJ2NoaWxkLWhhcy1mb2N1cycgKTtcblxuXHRcdFx0aWYgKCBjbG9zZWRfaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoICcuc3ViLW1lbnUnICkgKSB7XG5cdFx0XHRcdGNsb3NlZF9pdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggJy5zdWItbWVudScgKS5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICdmYWxzZScgKTtcblx0XHRcdH1cblx0XHR9OyAvLyBtZW51X3N1Yl9vcGVuKClcblxuXHRcdC8vIE1ldGhvZCB0byBjcmVhdGUgdGhlIHNtYWxsIHNjcmVlbiBtZW51XG5cdFx0ZnVuY3Rpb24gbWVudV9jcmVhdGUoKSB7XG5cblx0XHRcdGlmICggISBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyggJ2hhcy1vZmZzY3JlZW4tbmF2JyApICkge1xuXG5cdFx0XHRcdGlmICggISBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyggJ21lbnUtaXMtb3BlbicgKSApIHtcblx0XHRcdFx0XHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG5cdFx0XHRcdFx0bWVudV90b2dnbGUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyApO1xuXHRcdFx0XHRcdG1lbnVfdG9nZ2xlLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgc3VibWVudXMgYW5kIGJpbmQgZXZlbnRzIHdoZW4gbmVlZGVkXG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbWVudV9pdGVtc193aXRoX2NoaWxkcmVuX2NvdW50OyBpKysgKSB7XG5cdFx0XHRcdFx0dmFyIHN2Z0VsZW1lbnRzID0gbWVudV9pdGVtc193aXRoX2NoaWxkcmVuW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoICdzdmcnICk7XG5cdFx0XHRcdFx0Zm9yICggdmFyIHEgPSAwOyBxIDwgc3ZnRWxlbWVudHMubGVuZ3RoOyBxID0gcSArIDEgKSB7XG5cdFx0XHRcdFx0XHRzdmdFbGVtZW50c1txXS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBsaXN0ZW5lcl9zdWJtZW51X2NsaWNrICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbltpXS5yZW1vdmVFdmVudExpc3RlbmVyKCAnZm9jdXNpbicsIGxpc3RlbmVyX3N1Ym1lbnVfZm9jdXMgKTtcblx0XHRcdFx0fSAvLyBmb3JcblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIGxpbmtzIGZvciBoYXNoIGFuZCBiaW5kIGV2ZW50cyB3aGVuIG5lZWRlZFxuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IG1lbnVfaXRlbXNfbGlua3NfY291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIG1lbnVfaXRlbXNfbGlua3NbaV0uaGFzaCAmJiBtZW51X2l0ZW1zX2xpbmtzW2ldLnBhdGhuYW1lID09PSAnLycgKSB7XG5cdFx0XHRcdFx0XHRtZW51X2l0ZW1zX2xpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGxpc3RlbmVyX2hhc2hfY2xpY2sgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gLy8gZm9yXG5cblx0XHRcdFx0Ly8gQmluZCB0aGUgZXZlbnRcblx0XHRcdFx0bWVudV90b2dnbGUuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgbGlzdGVuZXJfbWVudSApO1xuXG5cdFx0XHRcdC8vIEFkZCB0aGUgYm9keSBjbGFzcyB0byBwcmV2ZW50IHRoaXMgZnJvbSBydW5uaW5nIGFnYWluXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCggJ2hhcy1vZmZzY3JlZW4tbmF2JyApO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtZnVsbC1uYXYnICk7XG5cdFx0XHR9XG5cdFx0fTsgLy8gbWVudV9jcmVhdGUoKVxuXG5cdFx0Ly8gTWV0aG9kIHRvIGRlc3Ryb3kgdGhlIHNtYWxsIHNjcmVlbiBtZW51XG5cdFx0ZnVuY3Rpb24gbWVudV9kZXN0cm95KCkge1xuXG5cdFx0XHR2YXIgdG1wX29wZW5cblx0XHRcdHZhciB0bXBfb3Blbl9jb3VudFxuXHRcdFx0dmFyIHQ7XG5cblx0XHRcdGlmICggISBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyggJ2hhcy1mdWxsLW5hdicgKSApIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIGFyaWEtaGlkZGVuLCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgaXQuXG5cdFx0XHRcdG1lbnUucmVtb3ZlQXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nICk7XG5cblx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCBzdWJtZW51cyBhbmQgYmluZCBldmVudHMgd2hlbiBuZWVkZWRcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5fY291bnQ7IGkgPSBpICsgMSApIHtcblx0XHRcdFx0XHRpZiAoIHN1Yl9tZW51X2FjaW9uICE9PSAnY2xpY2snICkge1xuXHRcdFx0XHRcdFx0bWVudV9pdGVtc193aXRoX2NoaWxkcmVuW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIGxpc3RlbmVyX3N1Ym1lbnVfY2xpY2sgKTtcblx0XHRcdFx0XHRcdG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbltpXS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXNpbicsIGxpc3RlbmVyX3N1Ym1lbnVfZm9jdXMgKTtcblx0XHRcdFx0XHRcdG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndXNlcy1jbGljaycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIHdlJ3JlIG5vdCB1c2luZyBjbGljaywgdGhlIG9wZW4gbWVudXMgbmVlZCB0byBiZSByZXNldFxuXHRcdFx0XHRpZiAoIHN1Yl9tZW51X2FjaW9uICE9PSAnY2xpY2snICkge1xuXHRcdFx0XHRcdHRtcF9vcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoaWxkLWhhcy1mb2N1cycpO1xuXHRcdFx0XHRcdHRtcF9vcGVuX2NvdW50ID0gdG1wX29wZW4ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Zm9yICggdCA9IDA7IHQgPCB0bXBfb3Blbl9jb3VudDsgdCA9IHQgKyAxICkge1xuXHRcdFx0XHRcdFx0dG1wX29wZW5bdF0uY2xhc3NMaXN0LnJlbW92ZSggJ2NoaWxkLWhhcy1mb2N1cycgKTtcblx0XHRcdFx0XHRcdHRtcF9vcGVuW3RdLnF1ZXJ5U2VsZWN0b3IoICcuc3VibWVudS1pcy1vcGVuJyApLmNsYXNzTGlzdC5yZW1vdmUoICdzdWJtZW51LWlzLW9wZW4nICk7XG5cdFx0XHRcdFx0XHR0bXBfb3Blblt0XS5xdWVyeVNlbGVjdG9yKCAnLnN1Yi1tZW51JyApLnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVW5iaW5kIHRoZSBldmVudFxuXHRcdFx0XHRtZW51X3RvZ2dsZS5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCBsaXN0ZW5lcl9tZW51ICk7XG5cblx0XHRcdFx0Ly8gQWRkIHRoZSBib2R5IGNsYXNzIHRvIHByZXZlbnQgdGhpcyBmcm9tIHJ1bm5pbmcgYWdhaW5cblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCAnaGFzLWZ1bGwtbmF2JyApO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtb2Zmc2NyZWVuLW5hdicgKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gQ2hlY2sgaW5pdCBtZW51IHN0YXRlXG5cdFx0aWYgKCBnZXRfc2NyZWVuX3NpemUoICdoYXMtb2Zmc2NyZWVuLW5hdicgKSApIHtcblx0XHRcdG1lbnVfY3JlYXRlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYXJpYS1jb250cm9scyBpc24ndCBzZXQsIHNldCBpdFxuXHRcdGlmICggISBhcmlhX2NvbnRyb2xzICkge1xuXHRcdFx0bWVudV90b2dnbGUuc2V0QXR0cmlidXRlKCAnYXJpYS1jb250cm9scycsIG1lbnVfaWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIGN1cnJlbnRfbWVudV9pdGVtICkge1xuXHRcdFx0Y3VycmVudF9tZW51X2l0ZW0ucXVlcnlTZWxlY3RvciggJ2EnICkuc2V0QXR0cmlidXRlKCAnYXJpYS1jdXJyZW50JywgJ3BhZ2UnICk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHRcdEV2ZW50c1xuXHRcdCovXG5cblx0XHQvLyBEZWJvdW5jZWQgcmVzaXplIGV2ZW50IHRvIGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgc21hbGwgc2NyZWVuIG1lbnUgb3B0aW9uc1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgbGlzdGVuZXJfd2luZG93ICk7XG5cblx0XHQvLyBDbG9zZSB0aGUgc3VibWVudXMgYnkgY2xpY2tpbmcgb2ZmIG9mIHRoZW0gb3IgaGl0dGluZyBFU0Ncblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIGxpc3RlbmVyX2Nsb3NlX29wZW5fbWVudXMgKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBsaXN0ZW5lcl9jbG9zZV9vcGVuX21lbnVzICk7XG5cblx0XHQvKlxuXHRcdFx0SGlkaW5nIGFuZCBzaG93aW5nIHN1Ym1lbnVzIChjbGljaywgZm9jdXMsIGhvdmVyKVxuXHRcdCovXG5cblx0XHQvLyBMb29wIHRocm91Z2ggYWxsIGl0ZW1zIHdpdGggc3ViIG1lbnVzIGFuZCBiaW5kIGZvY3VzIHRvIHRoZW0gZm9yIHRhYmJpbmdcblx0XHRmb3IgKCBpID0gMDsgaSA8IG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbl9jb3VudDsgaSA9IGkgKyAxICkge1xuXG5cdFx0XHQvLyBMZXQgYSBzY3JlZW4gcmVhZGVyIGtub3cgdGhpcyBtZW51IGhhcyBhIHN1Ym1lbnUgYnkgaG9va2luZyBpbnRvIHRoZSBmaXJzdCBsaW5rXG5cdFx0XHRtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5baV0ucXVlcnlTZWxlY3RvciggJ2EnICkuc2V0QXR0cmlidXRlKCAnYXJpYS1oYXNwb3B1cCcsICd0cnVlJyApO1xuXG5cdFx0XHQvLyBIaWRlIGFuZCBsYWJlbCBlYWNoIHN1YiBtZW51XG5cdFx0XHRtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5baV0ucXVlcnlTZWxlY3RvciggJy5zdWItbWVudScgKS5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xuXHRcdFx0bWVudV9pdGVtc193aXRoX2NoaWxkcmVuW2ldLnF1ZXJ5U2VsZWN0b3IoICcuc3ViLW1lbnUnICkuc2V0QXR0cmlidXRlKCAnYXJpYS1sYWJlbCcsICdTdWJtZW51JyApO1xuXG5cdFx0XHQvLyBJZiB0aGUgc2NyZWVuIGlzIHNtYWxsIG9yIHRoZSBhY3Rpb24gaXMgc2V0IHRvIGNsaWNrXG5cdFx0XHRpZiAoIGdldF9zY3JlZW5fc2l6ZSggJ2hhcy1vZmZzY3JlZW4tbmF2JyApIHx8IHN1Yl9tZW51X2FjaW9uID09PSAnY2xpY2snICkge1xuXHRcdFx0XHRtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5baV0uYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgbGlzdGVuZXJfc3VibWVudV9jbGljayApO1xuXG5cdFx0XHRcdHZhciBzdmdFbGVtZW50cyA9IG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbltpXS5xdWVyeVNlbGVjdG9yQWxsKCAnc3ZnJyApO1xuXG5cdFx0XHRcdGZvciAoIHZhciB6ID0gMDsgeiA8IHN2Z0VsZW1lbnRzLmxlbmd0aDsgeiA9IHogKyAxICkge1xuXG5cdFx0XHRcdFx0c3ZnRWxlbWVudHNbel0uYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgbGlzdGVuZXJfc3VibWVudV9jbGljayApO1xuXHRcdFx0XHRcdHN2Z0VsZW1lbnRzW3pdLmFkZEV2ZW50TGlzdGVuZXIoICdrZXlwcmVzcycsICggZSApID0+IHsgWydTcGFjZScsICdFbnRlciddLmluY2x1ZGVzKCBlLmNvZGUgKSAmJiBsaXN0ZW5lcl9zdWJtZW51X2NsaWNrKCBlICkgfSApO1xuXHRcdFx0XHRcdHN2Z0VsZW1lbnRzW3pdLnNldEF0dHJpYnV0ZSggJ3RhYmluZGV4JywgJzAnICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1lbnUuY2xhc3NMaXN0LmFkZCggc3ViX21lbnVfYWNpb24gPT09ICdjbGljaycgPyAndXNlcy1jbGljaycgOiAndXNlcy1ob3ZlcicgKTtcblx0XHRcdH0gZWxzZSBpZiAoIHN1Yl9tZW51X2FjaW9uICE9PSAnY2xpY2snICkge1xuXHRcdFx0XHRpZiAoIGdldF9zY3JlZW5fc2l6ZSggJ2hhcy1mdWxsLW5hdicgKSApIHtcblx0XHRcdFx0XHRtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5baV0uYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlb3ZlcicsIGxpc3RlbmVyX3N1Ym1lbnVfZm9jdXMgKTtcblx0XHRcdFx0XHRtZW51X2l0ZW1zX3dpdGhfY2hpbGRyZW5baV0uYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3Blbl9tZW51cyA9IG1lbnUucXVlcnlTZWxlY3RvckFsbCggJy5zdWJtZW51LWlzLW9wZW4nICk7XG5cdFx0XHRcdFx0XHR2YXIgb3Blbl9tZW51c19jb3VudCA9IG9wZW5fbWVudXMubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIG9wbjtcblxuXHRcdFx0XHRcdFx0Ly8gV2Ugd2VyZSBnZXR0aW5nIHNvbWUgZXJyb3JzLCBzbyBsZXQncyBhZGQgaW4gYSBjaGVja3BvaW50XG5cdFx0XHRcdFx0XHRpZiAoIG9wZW5fbWVudXNfY291bnQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgb3BlbiBtZW51cyBhbmQgY2xvc2UgdGhlbVxuXHRcdFx0XHRcdFx0XHRmb3IgKCBvcG4gPSAwOyBvcG4gPCBvcGVuX21lbnVzX2NvdW50OyBvcG4gPSBvcG4gKyAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0bWVudV9zdWJfY2xvc2UoIG9wZW5fbWVudXNbb3BuXSApO1xuXG5cdFx0XHRcdFx0XHRcdH0gLy8gZm9yXG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0bWVudV9pdGVtc193aXRoX2NoaWxkcmVuW2ldLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1c2luJywgbGlzdGVuZXJfc3VibWVudV9mb2N1cyApO1xuXHRcdFx0XHRcdG1lbnVfaXRlbXNfd2l0aF9jaGlsZHJlbltpXS5xdWVyeVNlbGVjdG9yQWxsKCAnLnN1Yi1tZW51JyApLmZvckVhY2goIHN1Ym1lbnUgPT4ge1xuXHRcdFx0XHRcdFx0c3VibWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VvdmVyJywgZXZlbnQgPT4ge1xuXHRcdFx0XHRcdFx0XHRzdWJtZW51LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2NoaWxkLWhhcy1mb2N1cycgKTtcblx0XHRcdFx0XHRcdFx0c3VibWVudS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoICdzdWJtZW51LWlzLW9wZW4nICk7XG5cdFx0XHRcdFx0XHR9LCBmYWxzZSApO1xuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fSAvLyBpZlxuXHRcdFx0fSAvLyBpZlxuXHRcdH0gLy8gZm9yXG5cblx0XHQvLyBFeGVjdXRlIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuXHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0Y2FsbGJhY2suY2FsbCgpO1xuXHRcdH1cblx0fTsgLy8gYnVpbGRfbWVudSgpXG5cblx0Lypcblx0XHRIZWxwZXIgZnVuY3Rpb25zXG5cdCovXG5cblx0Ly8gR2V0IHNjcmVlbiBzaXplIGZyb20gZ2V0Q29tcHV0ZWRTdHlsZSAoc28gd2UgZG9uJ3QgaGF2ZSB0byBkZWZpbmUgZWFjaCBicmVha3BvaW50IHR3aWNlKSAtLSBWYWx1ZXMgYXJlIHNldCBpbiBDU1MgLS1cblx0ZnVuY3Rpb24gZ2V0X3NjcmVlbl9zaXplKCBzaXplU3RyaW5nICkge1xuXHRcdHZhciBzaXplID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRvY3VtZW50LmJvZHksJzpiZWZvcmUnICkuZ2V0UHJvcGVydHlWYWx1ZSggJ2NvbnRlbnQnICk7XG5cblx0XHRpZiAoIHNpemUgJiYgc2l6ZS5pbmRleE9mKCBzaXplU3RyaW5nICkgIT09IC0xICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9O1xuXG59ICkoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkZWJvdW5jZSBmcm9tICcuL3V0aWxpdHkvZGVib3VuY2UnO1xuaW1wb3J0IHByaW1hcnlNZW51IGZyb20gJy4vY29tcG9uZW50cy9wcmltYXJ5LW1lbnUuanMnO1xuaW1wb3J0IHNlYXJjaFRvZ2dsZSBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoLXRvZ2dsZS5qcyc7XG5pbXBvcnQgd29vTWVudUNhcnQgZnJvbSAnLi9jb21wb25lbnRzL3dvby1tZW51LWNhcnQuanMnO1xuXG5wcmltYXJ5TWVudSgpO1xuc2VhcmNoVG9nZ2xlKCk7XG53b29NZW51Q2FydCgpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zdCBoYXNTZWxlY3RpdmVSZWZyZXNoID0gKFxuXHRcdCd1bmRlZmluZWQnICE9PSB0eXBlb2Ygd3AgJiZcblx0XHR3cC5jdXN0b21pemUgJiZcblx0XHR3cC5jdXN0b21pemUuc2VsZWN0aXZlUmVmcmVzaCAmJlxuXHRcdHdwLmN1c3RvbWl6ZS5uYXZNZW51c1ByZXZpZXcuTmF2TWVudUluc3RhbmNlUGFydGlhbFxuXHQpO1xuXG5cdC8vIHBhcnRpYWwtY29udGVudC1yZW5kZXJlZCBtaWdodCByZW5kZXIgbXVsdGlwbGUgdGltZXMgZm9yIHNvbWUgcmVhc29uLCBsZXQncyBtYWtlIHN1cmUgdG8gZGVib3VjZSB0aGlzLlxuXHRjb25zdCBpbml0ID0gZGVib3VuY2UoICgpID0+IHtcblx0XHQvLyB3ZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGJlZm9yZSBjYWxsaW5nIHByaW1hcnkgbWVudSBhZ2Fpbi5cblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtb2Zmc2NyZWVuLW5hdicgKTtcblxuXHRcdHByaW1hcnlNZW51KCk7XG5cdFx0c2VhcmNoVG9nZ2xlKCk7XG5cdH0sIDEwMDAgKTtcblxuXHRpZiAoIGhhc1NlbGVjdGl2ZVJlZnJlc2ggKSB7XG5cdFx0d3AuY3VzdG9taXplLnNlbGVjdGl2ZVJlZnJlc2guYmluZCggJ3BhcnRpYWwtY29udGVudC1yZW5kZXJlZCcsIGZ1bmN0aW9uKCBwbGFjZW1lbnQgKSB7XG5cdFx0XHRjb25zdCBjaGFuZ2VkSGVhZGVyVmFyaWF0aW9uID0gKFxuXHRcdFx0XHRwbGFjZW1lbnQgJiZcblx0XHRcdFx0J251bGwnICE9PSBwbGFjZW1lbnQuY29udGFpbmVyWyAwIF0ucGFyZW50Tm9kZSAmJlxuXHRcdFx0XHQnaGVhZGVyX3ZhcmlhdGlvbicgPT09IHBsYWNlbWVudC5wYXJ0aWFsLmlkXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIGNoYW5nZWRIZWFkZXJWYXJpYXRpb24gKSB7XG5cdFx0XHRcdGluaXQoKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==