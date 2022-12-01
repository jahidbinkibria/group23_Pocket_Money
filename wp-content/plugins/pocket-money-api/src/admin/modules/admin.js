import $ from "jquery"

class Admin {
  //1. INITALIZATION
  constructor() {
    if (typeof pagenow !== "undefined") {
      this.events()
    }
  }

  events() {
    // $(".components-checkbox-control__input").each(function () {
    //   this.type = "radio"
    // })
  }
}

export default Admin
