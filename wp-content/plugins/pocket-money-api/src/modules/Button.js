class Button {
  //1. INITALIZATION
  constructor() {
    this.buttons = document.getElementsByClassName("wp-block-button__link")
  }

  //2. EVENTS.
  events() {
    this.buttons.on("click", this.buttonAction.bind(this))
  }

  //3. FUNCTIONS/ACTIONS.

  buttonAction() {
    alert(this.target.value)
  }
}

export default Button
