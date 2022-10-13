import GlobalConfig from "./modules/globalConfig"
import ApiResponse from "./modules/ApiResponse"
import AppLocalStorage from "./modules/appLocalStorage"
import GamesType from "./modules/GamesType"
import AnimateNumber from "./modules/AnimateNumber"

class GameConfig {
  // Initialize.

  constructor() {
    if (typeof Winwheel !== "function") return ""

    this.activity_interval = ""
    //
    this.app_global_config = new GlobalConfig()

    // Initalize local storage.

    this.app_local_storage = new AppLocalStorage()

    // API Initialization
    this.save_game_data = new ApiResponse()

    // set game id in global scope.
    this.app_global_config.set_game_id(Math.random().toString(36).slice(2))

    this.game_id = this.app_global_config.get_game_id()

    // Animate number initalization

    this.animate_the_number = new AnimateNumber()

    //

    // Get Game TYpe.

    var my_game_type = new GamesType()
    // this.game_type = my_game_type.game_type
    this.game_type_id = my_game_type.game_type.id

    this.game_type = my_game_type.game_type
    // console.table(my_game_type)

    this.user_id = ""
    this.wheelPower = 0

    this.wheelSpinning = false

    // players playing status.
    this.player_one = true
    this.botPlay = false

    // players name.
    this.title_player_one = "You"
    this.title_player_two = "Player 2"

    // points.
    this.playerPoint = 0
    this.botPoint = 0

    // players discount.
    this.discount_player_one = 0
    this.discount_player_two = 0

    // Spining Timing.

    this.spin_duration = 25
    this.wheel_spins_count = 1000

    // Settimeout Interval

    this.spinTimoutInterval = 3000

    // default wheel spins.

    // wheel configuration.
    this.theWheel = new Winwheel({
      responsive: true, // This wheel is responsive!
      numSegments: 5, // Specify number of segments.
      outerRadius: 212, // Set outer radius so wheel fits inside the background.
      textFontSize: 28, // Set font size as desired.
      // Define segments including colour and text.
      segments: [
        //these comes from a file/ db
        { fillStyle: "#7de6ef", text: "70%" },
        { fillStyle: "#e7706f", text: "50%" },
        { fillStyle: "#89f26e", text: "30%" },
        { fillStyle: "#29a1dd", text: "40%" },
        { fillStyle: "#eae56f", text: "60%" },
      ],
      // Specify the animation to use.
      animation: {
        // type: "spinToStop",
        direction: "clockwise",
        type: "spinOngoing",
        duration: this.spin_duration, // Duration in seconds.
        spins: this.wheel_spins_count, // Number of complete spins.
        callbackFinished: this.alertPrize.bind(this),
      },
    })

    // Wheel.

    this.the_wheel_box = document.querySelector(".the_wheel")
    this.the_canvas = document.querySelector("#canvas")

    this.adjustWheelPosition()

    window.addEventListener("resize", this.resizeListener.bind(this))
    // window.addEventListener("resize", this.resizeListener(), true)

    // Buttons.

    this.btn_start_spin = document.getElementById("startSpin")

    this.btn_stop_spin = document.getElementById("stopSpin")
    this.btn_stop_msg = document.getElementById("stop_msg")

    // Result container.

    this.result_container = document.getElementById("result_container")
    this.result_diff = document.getElementById("result_diff")
    this.result_player_one = document.getElementById("result_player_one")

    this.result_player_two = document.getElementById("result_player_two")

    if (this.game_type.tag == "indiv") {
      this.result_player_two.remove()
      this.result_player_one.classList.add("col-12")
    }

    this.final_result = document.getElementById("final_result")

    // call all the events.
    this.events()
  }

  // adjust wheel

  adjustWheelPosition() {
    var $this = this

    setTimeout(() => {
      if (window.innerWidth < 470) {
        $this.the_wheel_box.setAttribute("height", $this.the_canvas.offsetHeight + 100)
      }
    }, 300)
  }

  resizeListener() {
    if (window.innerWidth < 470) {
      // console.log("Width" + window.innerWidth)

      this.the_wheel_box.setAttribute("height", this.the_canvas.offsetHeight + 100)
    } else {
      this.the_wheel_box.setAttribute("height", 582)
    }
  }

  //Events.

  triggerBtnStart() {
    this.btn_start_spin.click()
  }

  triggerBtnStop() {
    this.btn_stop_spin.click()
  }

  events() {
    this.btn_start_spin.addEventListener("click", this.startSpin.bind(this))
    this.btn_stop_spin.addEventListener("click", this.stopSpin.bind(this))
  }

  // Functions/Actions.

  promptUserToStop() {
    var loop_count = this.app_global_config.prompt_to_stop_count
    this.activity_interval = setInterval(() => {
      if (loop_count > 1) {
        alert(this.app_global_config.prompt_alert_msg)
      }

      loop_count--
      if (loop_count == 0) {
        // Clearout the interval
        clearInterval(this.activity_interval)

        // Save data to database.
        // We are going to set the value of both player is 0.

        this.save_game_data.create_data(this.app_global_config.get_game_id(), this.app_global_config.get_user_id(), 0, 0, this.game_type_id)

        // reload the screen.
        setTimeout(() => {
          // Remove local storage information and reload the page
          this.app_local_storage.removeLocalStorageData(this.app_global_config.user_local_storage_key)
          window.location.reload()
        }, 3000)
      }
    }, this.app_global_config.prompt_to_stop_interval)
  }

  /**
   * Starts the wheel on button click
   */
  startSpin() {
    if (!this.wheelSpinning) {
      this.wheelSpinning = true

      this.theWheel.startAnimation()

      if (!this.botPlay) {
        // Hide Start Button
        this.btn_start_spin.classList.add("animate__animated", "animate__zoomOut", "animate__slow")
        this.btn_start_spin.style.setProperty("--animate-duration", "1s")

        var $this = this

        this.btn_start_spin.addEventListener("animationend", () => {
          $this.btn_start_spin.style.display = "none"

          if ($this.game_type.p_u_auto == true) {
            setTimeout($this.triggerBtnStop.bind(this), 1000)
          }

          if ($this.game_type.p_u_auto == false) {
            //
            $this.btn_stop_spin.style.display = "initial"
            $this.btn_stop_spin.classList.add("btnGlow")
            $this.btn_stop_msg.style.display = "block"
            $this.btn_stop_msg.classList.add("animate__animated", "animate__zoomIn", "animate__slow")
          }

          //
          $this.result_container.style.display = "block"
          $this.result_player_one.innerHTML = $this.title_player_one + " are playing!"
          $this.result_player_one.classList.add("current-player", "active-player")

          $this.promptUserToStop()
        })
      }
    }
  }

  /**
   * function to stop the wheel by player
   */

  stopSpin() {
    clearInterval(this.activity_interval)
    // segment no.

    this.theWheel.animation.spins = this.wheel_spins_count - 500
    this.theWheel.startAnimation()

    setTimeout(() => {
      this.theWheel.stopAnimation()
      this.wheelSpinning = false
    }, this.spinTimoutInterval)

    // this.theWheel.animation.spins = 25
    // this.theWheel.startAnimation()

    if (!this.botPlay) {
      this.btn_stop_spin.className = "btnFlat"
      // document.getElementById("stopSpin").innerHTML = "Calculating result"

      // this.btn_stop_spin.style.display = "none"
      this.btn_stop_spin.classList.add("animate__animated", "animate__bounceOut")

      // document.getElementById("stopSpin").innerHTML = this.title_player_two + "'s turn."
      // document.getElementById("stopSpin").disabled = "true"

      this.btn_stop_spin.addEventListener("animationend", () => {
        $this.btn_stop_spin.style.display = "none"
        $this.btn_stop_msg.style.display = "none"
        $this.result_player_one.innerHTML = "Calculating score ..."
      })

      var $this = this

      setTimeout(() => {
        this.result_player_one.classList.remove("current-player")
        this.result_player_two.classList.add("current-player")

        if ($this.game_type.tag == "indiv") {
          this.botPlay = false

          var indiv_playerPoint = document.getElementById("player_point").getAttribute("data-player_point")
          // send ajax request in here.

          var user_info = JSON.parse(localStorage.getItem($this.app_global_config.user_local_storage_key))
          // console.log(user_info[0].user_id);

          $this.save_game_data.create_data($this.game_id, user_info[0].user_id, indiv_playerPoint, 0, this.game_type_id)
        } else {
          this.botPlay = true
          this.playBot()
        }
      }, this.spinTimoutInterval + 3000) // added 3000 mili seconds more.
    } else {
      // console.log("Stop For Bot")
    }
  }

  /**
   * Triggers the bot to play after the player stops the wheel
   */

  playBot() {
    if (this.botPlay) {
      this.btn_stop_spin.style.display = "none"
      this.result_player_two.innerHTML = this.title_player_two + " is playing!"
      document.getElementById("stopSpin").innerHTML = "Playing " + this.title_player_two
      this.startSpin()

      setTimeout(() => {
        this.stopSpin()
      }, this.spinTimoutInterval)
    } else {
      this.botPlay = false
    }
  }

  /**
   * Sets the result in the result div
   */
  alertPrize(indicatedSegment) {
    // set result.

    if (this.botPlay) {
      //div.append(this.title_player_two + " got " + indicatedSegment.text)
      this.botPoint = parseInt(indicatedSegment.text)
      // this.result_player_two.innerHTML = this.title_player_two + " got <b>" + this.botPoint + "%</b>"
      var bot_discount_string = `<p class="animate__animated animate__fadeInDown">${this.title_player_two} got <b id="bot_point" data-bot_point="${this.botPoint}">${this.botPoint}%</b><span id="pos_dis" class="bot_dis"></span></p>`
      this.result_player_two.innerHTML = bot_discount_string
    } else {
      // div.append(this.title_player_one + " got " + indicatedSegment.text)
      this.playerPoint = parseInt(indicatedSegment.text)
      var player_one_discount_string = `<p class="animate__animated animate__zoomIn">${this.title_player_one} got <b id="player_point" data-player_point="${this.playerPoint}">${this.playerPoint}%</b><span id="pos_dis" class="player_1_dis"></span></p>`
      this.result_player_one.innerHTML = player_one_discount_string
    }
    //document.getElementById("result").appendChild(div)
    this.processResult(this.botPoint, this.playerPoint)
  }

  /**
   * Processing the both players result and take action
   */

  get_discount_bg($player) {
    if ($player == "bot") {
      var $discount_bg_sign = [
        {
          player_1_dis_bg_class: "bg-red",
          player_1_dis_prefix: "-",
          bot_dis_bg_class: "bg-green",
          bot_dis_prefix: "+",
        },
      ]
    } else {
      var $discount_bg_sign = [
        {
          player_1_dis_bg_class: "bg-green",
          player_1_dis_prefix: "+",
          bot_dis_bg_class: "bg-red",
          bot_dis_prefix: "-",
        },
      ]
    }

    return $discount_bg_sign[0]
  }

  processResult(botPoint, playerPoint) {
    var $this = this

    if (botPoint != 0 && playerPoint != 0) {
      this.btn_start_spin.style.display = "none"
      this.discount_player_one = playerPoint
      this.discount_player_two = botPoint

      this.btn_stop_spin.style.display = "none"

      // Get data from the browser local storage.
      this.user_info = this.app_local_storage.getLocalStorageData(this.app_global_config.user_local_storage_key)

      // If the value is not undefined or null, then we are going to use this user data.
      if (this.user_info != "undefined") {
        this.user_id = this.user_info[0].user_id
      }

      //save game data to api database.
      // console.log("Pro" + this.game_type_id)
      this.save_game_data.create_data(this.game_id, this.user_id, playerPoint, botPoint, this.game_type_id)

      var discount_share_msg = ""
      var show_result_diff_msg = 1

      //If both player got the same number.

      if (botPoint == playerPoint) {
        // change it later to ==

        show_result_diff_msg = 0
        // this.result_container.classList.add("current-player")
        //this.result_player_two.remove()
        //this.result_player_one.classList.add("current-player", "col-12")

        if (this.app_global_config.game_tie_reload == 1) {
          this.result_player_one.innerHTML = `<span class="user_win">${this.app_global_config.game_tie_reload_msg}</span>`
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        } else {
          // show the additional message instead of reload the page.

          var calculate_discount = [
            {
              players_result_diff: 0,
              base_discount: Math.abs(playerPoint), // positive number.
              final_discount: Math.abs(playerPoint),
            },
          ]

          // Display discounts.

          var player_1_dis = document.querySelector(".player_1_dis")
          var bot_dis = document.querySelector(".bot_dis")

          player_1_dis.innerHTML = `0%`
          player_1_dis.classList.add("bg-green")

          bot_dis.innerHTML = `0%`
          bot_dis.classList.add("bg-red")

          // this.result_diff.innerHTML = this.app_global_config.result_diff_msg + calculate_discount[0].players_result_diff + "%"
          //this.result_player_one.innerHTML = `<span class="user_win pb-6">${this.app_global_config.game_tie_msg} Both player got ${calculate_discount[0].base_discount}% in this game.</span>`
          // check game type first.

          if (this.game_type_id <= 1) {
            // competition
            discount_share_msg = `<span id="discount_share" class="user_win pb-6">${this.app_global_config.game_tie_msg} The difference you two is ${calculate_discount[0].players_result_diff} %. Both players got ${calculate_discount[0].base_discount}% in this campaign.</span>`
          } else {
            // collaboration
            discount_share_msg = `<span id="discount_share" class="user_win pb-6">${this.app_global_config.game_tie_msg} The sum of two players' discount is ${calculate_discount[0].base_discount * 2}%, and you two are going to share!</span>`
          }

          // this.final_result.innerHTML = `<span class="final_discount"><b>Your final discount is ${calculate_discount[0].final_discount}%</b></span>`
        }
      }

      // If bot is winner.
      else if (botPoint > playerPoint) {
        // Now, calculate discount.
        var calculate_discount = this.calculateDiscount()
        // console.log(calculate_discount)
        // this.result_diff.innerHTML = this.app_global_config.result_diff_msg + calculate_discount[0].players_result_diff + "%"
        discount_share_msg = `<span id="discount_share" class="${this.game_type.class_lost}">You ${this.game_type.txt_lost} ${calculate_discount[0].base_discount}% ${this.game_type.txt_dir_to} Player 2 in this campaign.</span>`
        // this.final_result.innerHTML = `<span class="final_discount"><b>Your final discount is ${calculate_discount[0].final_discount}%</b></span> ${player_lose_msg}`
      }
      // if user is winner.
      else {
        // Now, calculate discount.
        var calculate_discount = this.calculateDiscount()
        // console.log(calculate_discount)

        discount_share_msg = `<span  id="discount_share" class="${this.game_type.class_won}">You ${this.game_type.txt_won} ${calculate_discount[0].base_discount}% ${this.game_type.txt_dir_from} Player 2 in this campaign.</span>`
        // this.final_result.innerHTML = `<span class="final_discount"><b>Your final discount is ${calculate_discount[0].final_discount}%</b></span> ${player_win_msg}`
      }

      // sequential.......
      // show the difference.
      if (show_result_diff_msg == 1) {
        this.result_diff.innerHTML = this.app_global_config.result_diff_msg + calculate_discount[0].players_result_diff + "%"
        this.result_diff.style.setProperty("--animate-duration", "1.0s")
        this.result_diff.classList.add("show-block", "animate__animated", "animate__flipInX", "animate", "animate__delay-1s")
      }

      // show the final result.

      // document.querySelector(".game_info_container").setAttribute("style", "display:none")
      // document.querySelector(".game_info_container").classList.add("show-block", "animate__slideInUp", "animate")

      this.final_result.innerHTML = `<span class="final_discount"><b>Your final discount is <span id="anim_final_discount" data-number="${calculate_discount[0].final_discount}">0</span>%</b></span> ${discount_share_msg}`
      this.final_result.style.display = "block"
      // show discount share message.

      document.querySelector("#discount_share").style.setProperty("--animate-duration", "1.0s")
      document.querySelector("#discount_share").classList.add("show-block", "animate__animated", "animate__flipInX", "animate", "animate__delay-2s")
      document.querySelector(".player_1_dis").classList.add("show-block", "animate__animated", "animate__fadeInUp", "animate", "animate__delay-2s")
      document.querySelector(".bot_dis").classList.add("show-block", "animate__animated", "animate__fadeInUp", "animate", "animate__delay-2s")

      // display final discount value.
      document.querySelector(".final_discount").style.setProperty("--animate-duration", "1.0s")
      document.querySelector(".final_discount").classList.add("show-block", "animate__animated", "animate__flipInX", "animate", "animate__delay-3s")

      document.querySelector(".final_discount").addEventListener("animationend", () => {
        $this.animate_the_number.incEltNbr("anim_final_discount")
      })

      // We remove the flashing current player effect from the result board.
      this.result_player_one.classList.remove("current-player")
      this.result_player_two.classList.remove("current-player")

      // Finally, we are going to remove local storage info
      // We will keep the local storage info, if both player get the same number.

      if (botPoint != playerPoint) {
        this.app_local_storage.removeLocalStorageData(this.app_global_config.user_local_storage_key)
      }
    } else {
      if (this.game_type.tag == "indiv") {
        this.final_result.innerHTML = `<span class="final_discount"><b>Your final discount is <span id="anim_final_discount" data-number="${playerPoint}">0</span>%</b></span>`
        this.final_result.style.display = "block"
        document.querySelector(".final_discount").classList.add("show-block", "animate__animated", "animate__flipInX", "animate", "show-block")
        document.querySelector(".final_discount").style.setProperty("--animate-duration", "2.0s")
        document.querySelector(".final_discount").addEventListener("animationend", () => {
          $this.animate_the_number.incEltNbr("anim_final_discount")
        })
      }
    }
  }

  calculateDiscount() {
    // competition.
    var players_result_diff = this.discount_player_one - this.discount_player_two
    var discount_amount = players_result_diff / 2

    var player_one_final_discount = this.discount_player_one + discount_amount
    var player_two_final_discount = this.discount_player_two

    var player_1_dis = document.querySelector(".player_1_dis")
    var bot_dis = document.querySelector(".bot_dis")

    var discount_bg_sign = this.get_discount_bg("bot")

    if (discount_amount > 0) {
      discount_bg_sign = this.get_discount_bg("player")
    }

    // var player_1_dis_bg_class = discount_amount > 0 ? "bg-green" : "bg-red"
    // var bot_dis_bg_class = discount_amount > 0 ? "bg-red" : "bg-green"

    //Collaboration.

    if (this.game_type.tag == "collab") {
      // console.log("collab")
      // Bot is winner.
      if (this.discount_player_one < this.discount_player_two) {
        // console.log("Bot Winner" + discount_amount)
        discount_bg_sign = this.get_discount_bg("player") // player bg color will be green and received the discount.
        player_one_final_discount = this.discount_player_one + Math.abs(discount_amount)
      } else {
        // player is winner.
        // console.log("Player Winner" + discount_amount)
        discount_bg_sign = this.get_discount_bg("bot") // player bg color will be green and donated the discount.
        player_one_final_discount = this.discount_player_one - discount_amount
      }
    } else if (this.game_type.tag == "indiv") {
      //
    } else {
    }

    discount_amount = Math.abs(discount_amount) // turn everything postive value.

    player_1_dis.innerHTML = `${discount_bg_sign.player_1_dis_prefix + discount_amount}%`
    player_1_dis.classList.add(discount_bg_sign.player_1_dis_bg_class)

    bot_dis.innerHTML = `${discount_bg_sign.bot_dis_prefix + discount_amount}%`
    bot_dis.classList.add(discount_bg_sign.bot_dis_bg_class)

    // Finally return the player 1 individual discount and full discount value.
    return [
      {
        players_result_diff: Math.abs(players_result_diff),
        base_discount: Math.abs(discount_amount), // positive number.
        final_discount: player_one_final_discount,
      },
    ]
  }
}

export default GameConfig
