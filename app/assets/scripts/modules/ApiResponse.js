import GlobalConfig from "./globalConfig"
import axios from "axios"

class ApiResponse {
  constructor() {
    // http://localhost/wheeljs_api/wp-json/ggspin/v1/read/
    // http://localhost/wheeljs_api/wp-json/ggspin/v1/create/?id=01

    this.app_global_config = new GlobalConfig()

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.root_url = "http://localhost/wheeljs_api/"
    } else {
      this.root_url = "https://webpages.tuni.fi/spinning/api/"
    }

    this.api_url = this.root_url + "wp-json/ggspin/v1/read/"
    this.api_create_url = this.root_url + "wp-json/ggspin/v1/create/"
    this.events()
    //this.create_data()
    //this.read_data()
  }

  events() {
    // console.log("API Response")
  }

  async read_data() {
    try {
      const response = await axios.get(this.api_url)
      // console.log(response.data)
    } catch {}
  }

  async create_data(game_id, user_id, user_res, bot_res, game_type_id) {
    // data need to post.

    // game_type_id = typeof this.popup == "undefined" ? 0 : game_type_id

    const newPost = {
      game_id: game_id,
      user_id: user_id,
      user_res: user_res,
      bot_res: bot_res,
      game_type_id: game_type_id,
      played_at: new Date().toLocaleString().replace(",", ""),
    }

    // console.log(newPost)
    // console.table(newPost)

    var $this = this

    try {
      const response = await axios.post(this.api_create_url, newPost)
      // console.log(response.data)

      if (response.data.status == 1) {
        localStorage.removeItem($this.app_global_config.user_local_storage_key)
      }
    } catch (err) {
      // Handle Error Here
      console.error(err)
    }
  }
}

export default ApiResponse
