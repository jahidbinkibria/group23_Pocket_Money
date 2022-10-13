// Stylesheets.
import "animate.css"
import "../styles/style.scss"

// JavaScripts
import AppPopUp from "./modules/appPopup"
import GameConfig from "./GameConfig"

new AppPopUp()
new GameConfig()

if (module.hot) {
  module.hot.accept()
}
