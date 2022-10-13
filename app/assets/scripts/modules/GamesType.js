class GamesType {
  constructor() {
    this.game_type = this.get_game_type()
  }

  // Legends.
  // p_u = Player 1 (User)
  // p_b = Player 2 (Bot)
  // do not change game types is.
  // if you change in here then you need to change in api sites.
  // ref: wp-content\plugins\gg-spin-api\includes\gg_addon_helpers.php

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  get_game_type() {
    var game_types = [
      {
        id: 0,
        title: "Competition + Skill",
        tag: "comp",
        p_u: true,
        p_u_auto: false, // display stop button.
        p_b: true,
        txt_dir_to: "to",
        txt_dir_from: "from",
        txt_won: "won",
        class_won: "user_win",
        txt_lost: "lost",
        class_lost: "user_lose",
      },
      {
        id: 1,
        title: "Competition + Luck",
        tag: "comp",
        p_u: true,
        p_u_auto: true, // no stop button.
        p_b: true,
        txt_dir_to: "to",
        txt_dir_from: "from",
        txt_won: "won",
        class_won: "user_win",
        txt_lost: "lost",
        class_lost: "user_lose",
      },
      {
        id: 2,
        title: "Collaboration + Skill",
        tag: "collab",
        p_u: true,
        p_u_auto: false, // display stop button.
        p_b: true,
        txt_dir_to: "from", // reversing.
        txt_dir_from: "to",
        txt_won: "shared", // the idea is if you win the game then you will donate to other player.
        class_won: "user_lose",
        txt_lost: "received",
        class_lost: "user_win",
      },
      {
        id: 3,
        title: "Collaboration + Luck",
        tag: "collab",
        p_u: true,
        p_u_auto: true, // no stop button.
        p_b: true,
        txt_dir_to: "from", // reversing.
        txt_dir_from: "to",
        txt_won: "shared",
        class_won: "user_lose",
        txt_lost: "received",
        class_lost: "user_win",
      },
      {
        id: 4,
        title: "Individual + Skill",
        tag: "indiv",
        p_u: true,
        p_u_auto: false, // display stop button.
        p_b: false,
      },
      {
        id: 5,
        title: "Individual + Luck",
        tag: "indiv",
        p_u: true,
        p_u_auto: true, // no stop button.
        p_b: false,
      },
    ]

    // https://xyz.com
    // https://xyz.com?p=1
    // https://xyz.com?p=2
    // alert(window.location.href)

    var url_string = window.location
    var url = new URL(url_string)
    var game_index = url.searchParams.get("p")

    if (game_index == null || game_index == 0) {
      game_index = 0
    } else if (game_index > 5 || game_index == "rand") {
      game_index = this.randomIntFromInterval(0, 5)
    }
    // alert(game_index)

    var sel_game_type = game_types[game_index]
    let element = document.createElement("div")
    element.setAttribute("id", "game_type")
    // element.setAttribute("style", "display:none")
    element.innerHTML = `${sel_game_type.title}`
    // element.style.cssText = "position"
    document.body.append(element)
    document.getElementById("game_type").classList.add("animate__animated", "animate__fadeIn")

    setTimeout(() => {
      document.getElementById("game_type").classList.add("animate__animated", "animate__fadeOut")
    }, 3000)

    return sel_game_type
  }
}

export default GamesType
