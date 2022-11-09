import $ from "jquery"
import axios from "axios"

class CaseStudies {
  //1. INITALIZATION
  constructor() {
    // let params = new URLSearchParams()
    // params.append("action", "test_load_more_posts")

    // axios.post("/wp-admin/admin-ajax.php", params).then((res) => {
    //   // $("#case_studies").html("").html(res.data.data)
    // })

    // Stop executing program if there is no "all_case_studies" ID
    if ($("#all_case_studies").length == 0) return

    this.cs_pagination = $("#cs_pagination")
    this.cs_pagination_link = this.cs_pagination.find(".page-numbers")
    this.case_study_dropdown = $(".case_study_dropdown")

    //if we get value from url set it as true.
    $('select option[value="ecommerce"]').attr("selected", true)

    // Check all the pagination links.
    this.cs_pagination_link.each(function () {
      var page_id = $(this).html()
      if ($(this).hasClass("current")) {
        $(this).before(`<a class="page-numbers hidden" href=${window.location.href} page_id=${page_id}>${page_id}</a>`)
        $(this).attr("data-href", window.location.href)
        $(this).attr("data-page_id", page_id)
      } else {
        $(this).attr("page_id", page_id)
        $(this).after(`<span class="page-numbers hidden" data-href=${$(this).attr("href")} data-page_id=${page_id}>${page_id}</span>`)
      }
    })

    function getParam(param) {
      return new URLSearchParams(window.location.search).get(param)
    }

    // Bind Click Events.
    $(document).on("click", "a.page-numbers", function (e) {
      // $("a.page-numbers").removeClass("hidden")
      // $("span.page-numbers").removeClass("current").addClass("hidden")

      // $(this).addClass("hidden")
      // $(this).next("span").removeClass("hidden").addClass("current")

      var currentPageUrl = $(this).attr("href")
      var pageNo = currentPageUrl.split("/")
      var nextPageNo = pageNo[pageNo.length - 2]

      // <span aria-current="page" class="page-numbers current">1</span>

      window.history.pushState("", "", currentPageUrl)

      // call ajax in here.

      let params = new URLSearchParams()
      params.append("action", "load_more_posts")
      params.append("current_page", nextPageNo) // will make it dynamic later.

      if (getParam("tax")) {
        params.append("tax", getParam("tax")) // will make it dynamic later.
        params.append("cat", getParam("cat")) // will make it dynamic later.
      }
      if ($("#cs_pagination").length) {
        $("#cs_pagination").remove()
      }
      $("#case_studies").html("Loading....")
      axios.post("/wp-admin/admin-ajax.php", params).then((res) => {
        $("#case_studies").html("").html(res.data.data)
      })

      e.preventDefault()
    })

    // Change Dropdown.

    this.case_study_dropdown.on("change", function (elem) {
      console.log($(this).val())

      let $cat = $("option:selected", this).attr("data-cat")
      let $tax = $("option:selected", this).attr("data-tax")
      // let $tax = $this.options[$this.selectedIndex].getAttribute("data-tax")

      console.log($cat)
      console.log($tax)

      let getUrl = window.location
      let baseUrl = getUrl.protocol + "/" + getUrl.host + "/case-studies/"
      console.log(baseUrl)

      // $url = "";

      // let $current_url = ;
      window.history.pushState("", "", "")
      let $mod_url = "?cat=" + $cat + "&tax=" + $tax
      window.history.pushState("", "", $mod_url)
      console.log($mod_url)

      // call ajax in here.

      let params = new URLSearchParams()
      params.append("action", "load_more_posts")
      params.append("current_page", 1) // will make it dynamic later.
      params.append("tax", getParam("tax")) // will make it dynamic later.
      params.append("cat", getParam("cat")) // will make it dynamic later.

      if ($("#cs_pagination").length) {
        $("#cs_pagination").remove()
      }
      $("#case_studies").html("Loading....")
      axios.post("/wp-admin/admin-ajax.php", params).then((res) => {
        $("#case_studies").html("").html(res.data.data)
      })

      // elem.addEventListener("change", $this.handleDropdown.bind(this))
    })
  }
}

export default CaseStudies
