/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/PublicationsSearch.js":
/*!*******************************************!*\
  !*** ./src/modules/PublicationsSearch.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


class PublicationsSearch {
  //1. INITALIZATION
  constructor() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".all_publications").length == 0) return;
    this.all_publications = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".all_publications");
    this.pub_list = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".pub-list");
    this.no_publications = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#no-publications");
    this.docType_menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#docType-menu");
    this.year_menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#year-menu");
    this.authors_menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#authors-menu");
    this.all_pub_filter_checkboxes = jquery__WEBPACK_IMPORTED_MODULE_0___default()([]).add(this.docType_menu).add(this.year_menu).add(this.authors_menu);
    this.cta_btn = this.pub_list.find(".cta-btn");
    this.cta_disable = this.cta_btn.find("a.cta_disable");
    this.read_abstract = this.pub_list.find(".read_abstract");
    this.copy_link = this.pub_list.find(".copy_link");
    this.export_citation = this.pub_list.find(".export_citation");
    this.export_btn_close = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".export .close");
    this.stag_class = "gg_found"; // result tag class.

    this.filter_overflow_class = "gg-filter-overflow"; // result tag class.

    this.gg_total_rows = this.pub_list.length; //console.log(this.gg_total_rows)

    this.getAllPublications();
    this.events();
  } //2. EVENTS.


  events() {
    this.initPubLists();
    this.pubFilterScroll(); // Search Events.

    this.all_pub_filter_checkboxes.find(":checkbox").on("click", this.fetchAllSelectedKeywords.bind(this));
  } //3. FUNCTIONS/ACTIONS.
  // Reset Publication Link.


  initPubLists() {
    this.all_pub_filter_checkboxes.find(":checkbox").prop("checked", false); // Unchecks it
  } // Publications Filter Scroll.


  pubFilterScroll() {
    var $default_height = this.docType_menu.find(".gg-pub-filters").outerHeight() + "px";
    jquery__WEBPACK_IMPORTED_MODULE_0___default()([]).add(this.year_menu.find(".gg-pub-filters")).add(this.authors_menu.find(".gg-pub-filters")).addClass("gg-filter-overflow").css({
      "max-height": $default_height
    });
  } // Tooltip.


  initTooltip() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("a[rel=tipsy]").each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).tipsy({
        fade: true,
        gravity: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("gravity"),
        opacity: 1
      });
    });
  } // Read Abstract


  readAbstract(e) {
    e.preventDefault();
    var postID = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div.cta-btn").attr("data-id");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".abs_content_" + postID).fadeToggle(300).toggleClass("gg-dn");
  } // Copy Link.


  copyLink(e) {
    e.preventDefault();
    var $prev_title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("title");
    var url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("data-url");
    var $temp = jquery__WEBPACK_IMPORTED_MODULE_0___default()("<input>");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").append($temp);
    $temp.val(url).select();
    document.execCommand("copy");
    $temp.remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("title", "COPIED");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger("mouseenter").tipsy({
      fade: true,
      gravity: "n",
      opacity: 1
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("title", $prev_title);
  } // Export Citation


  exportCitation(e) {
    e.preventDefault();
    var postID = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent(".cta-btn").attr("data-id");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".exp_content_" + postID).fadeToggle(300).toggleClass("gg-dn");
  } // CTA disable.


  ctaDisable(e) {
    e.preventDefault();
  } //Export Button Close


  exportBtnClose() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest(".export").fadeToggle();
  } // Fetch All KeyWords


  fetchAllSelectedKeywords() {
    var $this = this,
        $all_keywords = jquery__WEBPACK_IMPORTED_MODULE_0___default()(":checkbox:checked");
    $this.all_publications.addClass("gg-dn");
    var query_string = "";
    var sel_docs = new Array();
    var sel_year = new Array();
    var sel_authors = new Array();

    if ($all_keywords.length) {
      $all_keywords.each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("class") == "doc_type") {
          sel_docs.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("slug"));
        }

        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("class") == "year") {
          sel_year.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("slug"));
        }

        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("class") == "author") {
          sel_authors.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("slug"));
        }
      });

      if (sel_docs.length) {
        query_string += "docs_type=" + sel_docs.join("_") + "&";
      }

      if (sel_year.length) {
        query_string += "year=" + sel_year.join("_") + "&";
      }

      if (sel_authors.length) {
        query_string += "author=" + sel_authors.join("_");
      }

      $this.getAllPublications(query_string); //$("html, body").animate({ scrollTop: 0 }, "slow")
    } else {
      // reset publication lists.
      this.initPubLists();
      $this.getAllPublications();
    }
  }

  getAllPublications(query_string) {
    // $("html, body").animate({ scrollTop: 0 }, "slow")
    var $this = this;
    var $all_publications = $this.all_publications;
    $this.no_publications.addClass("gg-dn");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".loading_box").removeClass("gg-dn");
    var output = "";

    if (typeof query_string == "undefined") {
      query_string = "";
    } else {
      query_string = "?" + query_string;
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(ggAdditionalData.gg_app_root + "/wp-json/ggpub/v1/search" + query_string, function (response) {
      response.forEach((data, index, array) => {
        for (const key of Object.keys(data)) {
          var publications = data[key];
          output += publications.map(function (publication) {
            return `<div class="pub_item">

              <div data-sort_key="Journal_${publication.year}" class="pub-list" data-stag="Journal ${publication.year} ${publication.author}" data-doc_type="Journal" data-year="${publication.year}" data-author="Hamari, Juho">
            
                <div class="pub-cta">
                  <span class="doc-type">${publication.doc_type}</span>
                  <div class="cta-btn" data-id="${publication.id}">
                                
                    <a href="#" class="${publication.abstract.length ? "read_abstract" : "cta_disable"}" ${publication.abstract.length ? 'rel="tipsy"' : ""}  data-gravity="e" original-title="READ ABSTRACT"><i class="fa fa-file-text-o"></i></a>            
                    
                    <a href="#" class="${publication.url.length ? "copy_link" : " cta_disable"}" ${publication.url.length ? 'rel="tipsy"' : ""} data-title="COPY LINK" data-url="${publication.url}" data-gravity="n" original-title="COPY LINK"><i class="fa fa-link"></i></a>
            
                    <a href="#" class="export_citation" rel="tipsy" data-gravity="s" original-title="EXPORT CITATION"><i class="fa fa-quote-right"></i></a>
                  </div>
                </div>
            
                <div class="pub-text">

                  <span class=" author">${publication.author}</span>

                  (${publication.year}).
            
                  <a href="${publication.url}" target="_blank">
                  
                        <span class="worktitle">${publication.title}</span></a>.

                        <span class="publisher">${publication.publisher}</span>,

                        ${publication.publisher.length ? `<span class="publisher">${publication.publisher}</span>,` : ""}

                        ${publication.booktitle.length ? `<span class="">In <em><span class="booktitle">${publication.booktitle}</span></em>,</span>` : ""}
                  
                        ${publication.journal.length ? `<span class="journal">${publication.journal}</span>,` : ""}                        

                        ${publication.volume.length ? `v. <span class="volume">${publication.volume}</span>,` : ""}

                        ${publication.address.length ? `<span class="address">${publication.address}.</span>` : ""}

                        ${publication.pages.length ? `pp. <span class="pages">${publication.pages}.</span>` : ""}                        
                  
                  <div class="abstract gg-dn abs_content_${publication.id}" data-abstract="${publication.id}">${publication.abstract}</div>            
                  
                </div>
              </div>
            
              <div class="export gg-dn exp_content_${publication.id}" data-export="${publication.id}">
            
                <div class="modal gg-modal-box-shadow" id="exportCitation" style="display: block;">
                  <div class="close"><span class="button_option_icon button_icon q_font_elegant_icon icon_close_alt" aria-hidden="true"></span></div>
                  <h5 style="text-align: center; padding: 7px">Export citation</h5>
                  <p class="formfield">
                    <label for="MLA">MLA</label>
                    <textarea id="MLA" onfocus="this.select();" readonly="">${publication.author} "${publication.title}" ${publication.journal}, ${publication.volume}. (${publication.year}): ${publication.pages}.</textarea>
                  </p>
                  <p class="formfield">
                    <label for="APA">APA</label>
                    <textarea id="APA" onfocus="this.select();" readonly="">${publication.author} (${publication.year}). ${publication.title} ${publication.journal}, ${publication.volume}(), ${publication.pages}.</textarea>
                  </p>
                  <p class="formfield">
                    <label for="Chicago">Chicago</label>
                    <textarea id="Chicago" onfocus="this.select();" readonly="">${publication.author} "${publication.title}" ${publication.journal} ${publication.volume}, no. (${publication.year}): ${publication.pages}.</textarea>
                  </p>
                  <p class="formfield">
                    <label for="Harvard">Harvard</label>
                    <textarea id="Harvard" onfocus="this.select();" readonly="">${publication.author}(${publication.year}). "${publication.title}" ${publication.journal}, ${publication.volume}() p.${publication.pages}.</textarea>
                  </p>
                  <p class="formfield">
                    <label for="Vancouver">Vancouver</label>
                    <textarea id="Vancouver" onfocus="this.select();" readonly="">${publication.author} "${publication.title}" ${publication.journal}. ${publication.year};${publication.volume}():${publication.pages}.
                    </textarea>
                  </p>
                  <p class="formfield">
                    <label for="BibTeX">BibTeX</label>
                    <textarea id="BibTeX" onfocus="this.select();" readonly="">${publication.raw_data}</textarea>
                  </p>
                </div>
              </div>
            
            </div>`;
          }).join("");
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(".loading_box").addClass("gg-dn");
      $all_publications.html(output);

      if ($all_publications.html().length > 0) {
        $this.initTooltip();
        $all_publications.removeClass("gg-dn");
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".read_abstract").on("click", $this.readAbstract);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".copy_link").on("click", $this.copyLink);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".export_citation").on("click", $this.exportCitation);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".export .close").on("click", $this.exportBtnClose);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()("a.cta_disable").on("click", $this.ctaDisable);
      } else {
        $this.no_publications.removeClass("gg-dn");
      }
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PublicationsSearch);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

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
/* harmony import */ var _modules_PublicationsSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/PublicationsSearch */ "./src/modules/PublicationsSearch.js");

var publications_search = new _modules_PublicationsSearch__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map