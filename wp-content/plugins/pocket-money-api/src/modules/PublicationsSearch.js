import $ from "jquery"

class PublicationsSearch {
  //1. INITALIZATION

  constructor() {
    if ($(".all_publications").length == 0) return

    this.all_publications = $(".all_publications")
    this.pub_list = $(".pub-list")
    this.no_publications = $("#no-publications")
    this.docType_menu = $("#docType-menu")
    this.year_menu = $("#year-menu")
    this.authors_menu = $("#authors-menu")
    this.all_pub_filter_checkboxes = $([]).add(this.docType_menu).add(this.year_menu).add(this.authors_menu)
    this.cta_btn = this.pub_list.find(".cta-btn")
    this.cta_disable = this.cta_btn.find("a.cta_disable")
    this.read_abstract = this.pub_list.find(".read_abstract")
    this.copy_link = this.pub_list.find(".copy_link")
    this.export_citation = this.pub_list.find(".export_citation")
    this.export_btn_close = $(".export .close")

    this.stag_class = "gg_found" // result tag class.

    this.filter_overflow_class = "gg-filter-overflow" // result tag class.
    this.gg_total_rows = this.pub_list.length
    //console.log(this.gg_total_rows)
    this.getAllPublications()
    this.events()
  }

  //2. EVENTS.

  events() {
    this.initPubLists()
    this.pubFilterScroll()

    // Search Events.
    this.all_pub_filter_checkboxes.find(":checkbox").on("click", this.fetchAllSelectedKeywords.bind(this))
  }

  //3. FUNCTIONS/ACTIONS.

  // Reset Publication Link.

  initPubLists() {
    this.all_pub_filter_checkboxes.find(":checkbox").prop("checked", false) // Unchecks it
  }

  // Publications Filter Scroll.

  pubFilterScroll() {
    var $default_height = this.docType_menu.find(".gg-pub-filters").outerHeight() + "px"

    $([]).add(this.year_menu.find(".gg-pub-filters")).add(this.authors_menu.find(".gg-pub-filters")).addClass("gg-filter-overflow").css({
      "max-height": $default_height,
    })
  }

  // Tooltip.

  initTooltip() {
    $("a[rel=tipsy]").each(function () {
      $(this).tipsy({ fade: true, gravity: $(this).data("gravity"), opacity: 1 })
    })
  }

  // Read Abstract

  readAbstract(e) {
    e.preventDefault()
    var postID = $(this).parent("div.cta-btn").attr("data-id")

    $(".abs_content_" + postID)
      .fadeToggle(300)
      .toggleClass("gg-dn")
  }

  // Copy Link.

  copyLink(e) {
    e.preventDefault()

    var $prev_title = $(this).data("title")

    var url = $(this).attr("data-url")
    var $temp = $("<input>")
    $("body").append($temp)
    $temp.val(url).select()
    document.execCommand("copy")
    $temp.remove()
    $(this).attr("title", "COPIED")
    $(this).trigger("mouseenter").tipsy({ fade: true, gravity: "n", opacity: 1 })
    $(this).attr("title", $prev_title)
  }

  // Export Citation

  exportCitation(e) {
    e.preventDefault()
    var postID = $(this).parent(".cta-btn").attr("data-id")
    $(".exp_content_" + postID)
      .fadeToggle(300)
      .toggleClass("gg-dn")
  }

  // CTA disable.

  ctaDisable(e) {
    e.preventDefault()
  }

  //Export Button Close

  exportBtnClose() {
    $(this).closest(".export").fadeToggle()
  }

  // Fetch All KeyWords

  fetchAllSelectedKeywords() {
    var $this = this,
      $all_keywords = $(":checkbox:checked")

    $this.all_publications.addClass("gg-dn")

    var query_string = ""
    var sel_docs = new Array()
    var sel_year = new Array()
    var sel_authors = new Array()

    if ($all_keywords.length) {
      $all_keywords.each(function () {
        if ($(this).attr("class") == "doc_type") {
          sel_docs.push($(this).data("slug"))
        }

        if ($(this).attr("class") == "year") {
          sel_year.push($(this).data("slug"))
        }

        if ($(this).attr("class") == "author") {
          sel_authors.push($(this).data("slug"))
        }
      })

      if (sel_docs.length) {
        query_string += "docs_type=" + sel_docs.join("_") + "&"
      }

      if (sel_year.length) {
        query_string += "year=" + sel_year.join("_") + "&"
      }

      if (sel_authors.length) {
        query_string += "author=" + sel_authors.join("_")
      }

      $this.getAllPublications(query_string)
      //$("html, body").animate({ scrollTop: 0 }, "slow")
    } else {
      // reset publication lists.

      this.initPubLists()
      $this.getAllPublications()
    }
  }

  getAllPublications(query_string) {
    // $("html, body").animate({ scrollTop: 0 }, "slow")
    var $this = this
    var $all_publications = $this.all_publications

    $this.no_publications.addClass("gg-dn")

    $(".loading_box").removeClass("gg-dn")

    var output = ""

    if (typeof query_string == "undefined") {
      query_string = ""
    } else {
      query_string = "?" + query_string
    }

    $.getJSON(ggAdditionalData.gg_app_root + "/wp-json/ggpub/v1/search" + query_string, function (response) {
      response.forEach((data, index, array) => {
        for (const key of Object.keys(data)) {
          var publications = data[key]

          output += publications
            .map(function (publication) {
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
            
            </div>`
            })
            .join("")
        }
      })
      $(".loading_box").addClass("gg-dn")
      $all_publications.html(output)
      if ($all_publications.html().length > 0) {
        $this.initTooltip()
        $all_publications.removeClass("gg-dn")
        $(".read_abstract").on("click", $this.readAbstract)
        $(".copy_link").on("click", $this.copyLink)
        $(".export_citation").on("click", $this.exportCitation)
        $(".export .close").on("click", $this.exportBtnClose)
        $("a.cta_disable").on("click", $this.ctaDisable)
      } else {
        $this.no_publications.removeClass("gg-dn")
      }
    })
  }
}

export default PublicationsSearch
