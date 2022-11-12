import $ from "jquery"
import axios from "axios"

class CaseStudies {
  //1. INITALIZATION
  constructor() {
    // Stop executing program if there is no "all_case_studies" ID
    if ($("#all_case_studies").length == 0) return

    this.cs_pagination = $("#cs_pagination")
    this.cs_pagination_link = this.cs_pagination.find(".page-numbers")
    this.case_study_dropdown = $(".case_study_dropdown")

    //if we get value from url set it as true.
    // $('select option[value="ecommerce"]').attr("selected", true)

    // Helper Functions.

    function getParam(param) {
      return new URLSearchParams(window.location.search).get(param)
    }

    // Bind Click Events.
    $(document).on("click", "a.page-numbers", function (e) {
      var currentPageUrl = $(this).attr("href")
      var pageNo = currentPageUrl.split("/")
      var nextPageNo = pageNo[pageNo.length - 2]

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

    this.case_study_dropdown.on("change", function () {
      let $cat = $("option:selected", this).attr("data-cat")
      let $tax = $("option:selected", this).attr("data-tax")
      window.history.pushState("", "", "/case-studies")
      let $mod_url = "?cat=" + $cat + "&tax=" + $tax

      if (typeof $cat == "undefined") {
        $mod_url = "/case-studies"
      }
      window.history.pushState("", "", $mod_url)

      // call ajax in here.

      let params = new URLSearchParams()
      params.append("action", "load_more_posts")
      params.append("current_page", 1) // will make it dynamic later.

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
    })
  }
}

export default CaseStudies
