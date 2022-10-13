import GlobalConfig from "./globalConfig"
import AppLocalStorage from "./appLocalStorage"

class AppPopUp {
  constructor() {
    this.popup = document.getElementById("popup")

    if (typeof this.popup == "undefined" || this.popup == null) {
      return ""
    }

    this.feedback_form = document.getElementById("feedback-form")
    this.user_id = document.getElementById("user_id")
    this.user_id.value = ""
    this.user_local_storage_key = "spin_user_data"
    this.user_id.focus()
    this.events()

    this.app_global_config = new GlobalConfig() // initialize app global config.

    this.app_local_storage = new AppLocalStorage() // initialize app local storage.

    //this.app_local_storage.setLocalStorageData()
    //console.log(this.app_local_storage.getLocalStorageData())
    // console.log(this.app_local_storage.removeLocalStorageData())

    // this.app_local_storage.removeLocalStorageData(this.user_local_storage_key)
    //console.log(this.app_local_storage.getLocalStorageData(this.user_local_storage_key))
    this.user_id_exist = false

    this.user_info = this.app_local_storage.getLocalStorageData(this.user_local_storage_key)
    // console.log(this.user_info)

    if (this.user_info != null) {
      this.destoryPopUp()
    }
    this.feedback_form.classList.add("animate__animated", "animate__backInUp")
    this.feedback_form.style.setProperty("--animate-duration", "1.5s")
  }

  events() {
    this.feedback_form.addEventListener("submit", this.handleForm.bind(this))
  }

  // functions.

  handleForm(e) {
    e.preventDefault()

    var user_id = this.user_id.value.trim()

    if (user_id != "") {
      this.app_global_config.set_user_id(user_id)

      var data = [
        {
          user_id: user_id,
        },
      ]

      this.app_local_storage.setLocalStorageData(this.user_local_storage_key, data)
      // alert(this.user_id.value)
      this.feedback_form.classList.add("animate__animated", "animate__backOutUp")
      this.feedback_form.style.setProperty("--animate-duration", ".5s")

      var $this = this
      this.feedback_form.addEventListener("animationend", () => {
        $this.destoryPopUp()

        var btn_start_spin = document.getElementById("startSpin")
        btn_start_spin.classList.add("animate__animated", "animate__bounce", "animate__repeat-1")
        // btn_start_spin.style.setProperty("--animate-duration", "1.5s")
      })
    } else {
      alert("User id is required.")

      this.user_id.value = ""
      this.user_id.focus()
    }
  }
  destoryPopUp() {
    this.popup.remove()
    document.querySelector("body").removeAttribute("class")
  }
}

export default AppPopUp
