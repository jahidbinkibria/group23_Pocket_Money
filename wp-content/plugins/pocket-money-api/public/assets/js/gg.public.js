;(function ($) {
  "use strict"

  $(function () {
    var $pub_list = $(".pub-list"),
      $no_publications = $("#no-publications"),
      $stag_class = "gg_found", // result tag class.
      $docType_menu = $(".docType-menu"),
      $year_menu = $(".year-menu"),
      $authors_menu = $(".authors-menu"),
      $cta_btn = $pub_list.find(".cta-btn"),
      $gg_total_rows = $pub_list.length

    // Initialization.
    init_pub_lists()

    function do_search($keyword, $type, $total_keywords) {
      if ($total_keywords > 1) {
        var $test = $('div[class^="pub-"]:not(.gg_found)')
        // console.log($type)
        if ($type != "doc_type") {
          $test = $("div.gg_found")
          $test.addClass("gg-list-dn")
        }

        $test
          .find("span.s_keywords:contains('" + $keyword + "')")
          .closest(".pub-list")
          .removeClass("gg-list-dn")
          .addClass($stag_class)
      } else {
        $pub_list.addClass("gg-list-dn")
        $(".pub-list span.s_keywords:contains('" + $keyword + "')")
          .closest(".pub-list")
          .removeClass("gg-list-dn")
          .addClass($stag_class)
      }

      return $(".gg-list-dn").length
    }

    function fetch_all_selected_keywords() {
      var $result = "",
        $all_keywords = $(":checkbox:checked"),
        $total_result_found = 0

      $all_keywords.each(function () {
        //console.log($(this).val())
        $total_result_found = do_search($(this).val(), $(this).attr("class"), $all_keywords.length)
        get_results($(this).val())
        $result = 1
      })

      if ($gg_total_rows == $total_result_found) {
        $no_publications.removeClass("gg-dn")
      } else {
        $no_publications.addClass("gg-dn")
      }
      //$("html, body").animate({ scrollTop: 0 }, "slow")
      return $result
    }

    function init_pub_lists() {
      $pub_list.removeClass("gg-list-dn " + $stag_class)
      $(":checkbox").prop("checked", false) // Unchecks it
    }

    $([])
      .add($docType_menu)
      .add($year_menu)
      .add($authors_menu)
      .find('input[type="checkbox"]')
      .on("click", function () {
        //console.log("clicked")
        var $keywords = fetch_all_selected_keywords()

        if ($keywords == "") {
          init_pub_lists()
        }
      })

    // Show/hide abstract.

    $cta_btn.find("a.read_abstract").on("click", function (e) {
      e.preventDefault()
      var postID = $(this).parent("div.cta-btn").attr("data-id")
      $(".abs_content_" + postID).fadeToggle(300)
    })

    // copy/text

    $cta_btn.find("a.copy_link").on("click", function (e) {
      var $prev_title = $(this).data("title")
      e.preventDefault()
      var url = $(this).attr("data-url")
      var $temp = $("<input>")
      $("body").append($temp)
      $temp.val(url).select()
      document.execCommand("copy")
      $temp.remove()
      //console.log(url)

      // alert($prev_title)
      $(this).attr("title", "COPIED")
      $(this).trigger("mouseenter").tipsy({ fade: true, gravity: "n", opacity: 1 })
      $(this).attr("title", $prev_title)
    })

    // Export

    $cta_btn.find("a.export_citation").on("click", function (e) {
      e.preventDefault()
      var postID = $(this).parent(".cta-btn").attr("data-id")
      $(".exp_content_" + postID).fadeToggle(300)
    })

    $(".close").on("click", function (e) {
      $(this).closest(".export").fadeToggle()
    })

    $("a[rel=tipsy]").each(function () {
      $(this).tipsy({ fade: true, gravity: $(this).data("gravity"), opacity: 1 })
    })

    // Disable.

    var $cta_disable = $cta_btn.find("a.cta_disable")

    $cta_disable.on("click", function () {
      return false
    })

    //

    // set mila.
    // trigger search.

    //var $first_author = $(".authors-menu ").find(":checkbox").first()
    // $first_author.prop("checked", true)
    //$first_author.trigger("click")

    $(this).trigger("mouseenter").tipsy({ fade: true, gravity: "n", opacity: 1 })
  })
})(jQuery)
