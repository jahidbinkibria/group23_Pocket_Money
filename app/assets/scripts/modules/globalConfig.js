import AppLocalStorage from "./appLocalStorage"
class GlobalConfig {
  constructor() {
    // Basic Game Info.

    this.game_id = 0
    this.game_tie_reload = 0
    this.game_tie_reload_msg = `<div class="result_tie">It's a Tie, Let's play again!</div>`
    this.game_tie_msg = `It's a Tie! `

    // User inactivity counter.
    this.prompt_alert_msg = `Please click on the stop button`
    this.prompt_to_stop_count = 2
    this.prompt_to_stop_interval = 15000 // 15 seconds

    // Result difference message.

    this.result_diff_msg = `The difference between you two is `

    // Local Storage Key.
    this.user_local_storage_key = "spin_user_data"
    this.app_local_storage = new AppLocalStorage()

    // Get data from the browser local storage.
    this.user_id = 0
    // this.app_local_storage.removeLocalStorageData(this.user_local_storage_key)
    var user_info = this.app_local_storage.getLocalStorageData(this.user_local_storage_key)

    // If the value is not undefined or null, then we are going to use this user data.
    if (user_info !== null) {
      // console.log(user_info.length)
      this.set_user_id(user_info[0].user_id)
    }

    this.events()
  }

  events() {
    //console.log("hello from global activity")
  }

  set_user_id(user_id) {
    this.user_id = user_id
  }

  get_user_id() {
    return this.user_id
  }

  // set game id.

  set_game_id(game_id) {
    this.game_id = game_id
  }

  get_game_id() {
    return this.game_id
  }

  elemSetAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key])
    }
  }
}

export default GlobalConfig
