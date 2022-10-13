class AnimateNumber {
  constructor() {
    this.speed = 30
    this.delay = 1000
  }

  events() {
    // nothing at this moment.
  }

  /* Call this function with a string containing the ID name to
   * the element containing the number you want to do a count animation on.*/
  incEltNbr(id, speed, dealy) {
    var $this = this
    var elt = document.getElementById(id)
    var endNbr = Number(document.getElementById(id).getAttribute("data-number"))
    // console.log(endNbr)
    // document.getElementById(id).innerHTML = 0
    $this.incNbrRec(0, endNbr, elt)
  }

  /*A recursive function to increase the number.*/
  incNbrRec(i, endNbr, elt) {
    var $this = this
    if (i <= endNbr) {
      elt.innerHTML = i
      setTimeout(function () {
        //Delay a bit before calling the function again.
        $this.incNbrRec(i + 1, endNbr, elt)
      }, this.speed)
    }
  }
}

export default AnimateNumber
