class UserActivity {
  constructor() {
    this.idle_time = 0
    this.countMouseIdleTime()
  }

  // Events.
  countMouseIdleTime() {
    var $this = this

    var myActivity = setInterval(function () {
      $this.idle_time = $this.idle_time + 1

      if ($this.idle_time > 15) {
        let text = `Would you like to continue?`
        if (confirm(text) == true) {
          $this.idle_time = 0
        } else {
          clearInterval(myActivity)
        }
      } else {
      }
    }, 1000) // every five second it will increase the value of idle_time.

    document.addEventListener(
      "keyup",
      (event) => {
        this.idle_time = 0
      },
      false
    )

    document.addEventListener(
      "mouseover",
      (event) => {
        this.idle_time = 0
      },
      false
    )
  }
}

export default UserActivity
