class CaseStudies {
  //1. INITALIZATION
  constructor() {
    this.case_study_dropdown = document.querySelector(".case_study_dropdown")
    this.all_case_studies = document.getElementById("all_case_studies")
    this.case_studies = document.getElementById("case_studies")
    this.cs_pagination = document.getElementById("cs_pagination").querySelectorAll(".page-numbers")
    this.events()
  }

  //2. EVENTS.
  events() {
    // this.case_study_dropdown.addEventListener("change", this.handleDropdown.bind(this))
    // this.cs_pagination.addEventListener("click", this.handlePagination.bind(this))

    var $this = this

    this.cs_pagination.forEach(function (elem) {
      elem.addEventListener("click", $this.handlePagination.bind(this))
    })
  }

  //3. FUNCTIONS/ACTIONS.

  handlePagination(e) {
    document.getElementById("case_studies").innerHTML = new Date()
    e.preventDefault()
  }

  handleDropdown(e) {
    let $this = e.target

    let $cat = $this.options[$this.selectedIndex].getAttribute("data-cat")
    let $tax = $this.options[$this.selectedIndex].getAttribute("data-tax")

    // $url = "";

    let $mod_url = "cat=" + $cat + "&tax=" + $tax

    // let price = element.options[element.selectedIndex].getAttribute("data-price")
    // console.log(e)
    // window.history.pushState("", "", "/something")
    // console.log(e.target.dataset.cat)
  }
}

export default CaseStudies
