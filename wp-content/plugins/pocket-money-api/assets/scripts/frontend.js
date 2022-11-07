/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Button.js":
/*!*******************************!*\
  !*** ./src/modules/Button.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Button {
  //1. INITALIZATION
  constructor() {
    this.buttons = document.getElementsByClassName("wp-block-button__link");
  } //2. EVENTS.


  events() {
    this.buttons.on("click", this.buttonAction.bind(this));
  } //3. FUNCTIONS/ACTIONS.


  buttonAction() {
    alert(this.target.value);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/modules/CaseStudies.js":
/*!************************************!*\
  !*** ./src/modules/CaseStudies.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CaseStudies {
  //1. INITALIZATION
  constructor() {
    this.case_study_dropdown = document.querySelector(".case_study_dropdown");
    this.all_case_studies = document.getElementById("all_case_studies");
    this.case_studies = document.getElementById("case_studies");
    this.cs_pagination = document.getElementById("cs_pagination").querySelectorAll(".page-numbers");
    this.events();
  } //2. EVENTS.


  events() {
    // this.case_study_dropdown.addEventListener("change", this.handleDropdown.bind(this))
    // this.cs_pagination.addEventListener("click", this.handlePagination.bind(this))
    var $this = this;
    this.cs_pagination.forEach(function (elem) {
      elem.addEventListener("click", $this.handlePagination.bind(this));
    });
  } //3. FUNCTIONS/ACTIONS.


  handlePagination(e) {
    document.getElementById("case_studies").innerHTML = new Date();
    e.preventDefault();
  }

  handleDropdown(e) {
    let $this = e.target;
    let $cat = $this.options[$this.selectedIndex].getAttribute("data-cat");
    let $tax = $this.options[$this.selectedIndex].getAttribute("data-tax"); // $url = "";

    let $mod_url = "cat=" + $cat + "&tax=" + $tax; // let price = element.options[element.selectedIndex].getAttribute("data-price")
    // console.log(e)
    // window.history.pushState("", "", "/something")
    // console.log(e.target.dataset.cat)
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CaseStudies);

/***/ }),

/***/ "./src/styles/frontend.scss":
/*!**********************************!*\
  !*** ./src/styles/frontend.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/frontend.scss */ "./src/styles/frontend.scss");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Button */ "./src/modules/Button.js");
/* harmony import */ var _modules_CaseStudies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/CaseStudies */ "./src/modules/CaseStudies.js");
// Stylesheets.
// import "animate.css"
 // import PublicationsSearch from "./modules/PublicationsSearch"



 // var publications_search = new PublicationsSearch()

var button = new _modules_Button__WEBPACK_IMPORTED_MODULE_2__["default"]();
new _modules_CaseStudies__WEBPACK_IMPORTED_MODULE_3__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map