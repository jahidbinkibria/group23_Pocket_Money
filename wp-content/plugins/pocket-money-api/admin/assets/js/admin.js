class GgSpinDownloadReport {
  constructor() {
    this.gg_spin_form = document.getElementById("gg_spin_form")
    this.gg_spin_download_btn = document.getElementById("gg_spin_download_btn")

    // Add all the checkbox.
    this.all_checkbox = this.gg_spin_form.querySelectorAll('input[type="checkbox"]')

    this.reset_checkbox()
    this.events()
  }

  // events.
  events() {
    this.gg_spin_form.addEventListener("submit", this.download_report.bind(this))
  }

  // reset checkbox.

  reset_checkbox() {
    this.all_checkbox.forEach(function (item) {
      item.checked = true
    })
  }
  // functions.

  download_report(e) {
    var status = this.gg_spin_form.querySelectorAll('input[type="checkbox"]:checked')

    if (status.length == 0) {
      e.preventDefault()
      alert("Please check at least one data tag.")
    } else {
      return true
    }
  }
}

new GgSpinDownloadReport()
