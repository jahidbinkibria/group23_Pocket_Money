class AppLocalStorage {
  constructor() {
    this.events()
  }

  events() {}

  // functions.
  setLocalStorageData(key, data) {
    if (data != "") {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  getLocalStorageData(key) {
    if (key != "undefined") {
      const data = JSON.parse(localStorage.getItem(key))
      // console.log(users)
      return data
    } else {
      return {}
    }
  }

  removeLocalStorageData(key) {
    if (key != "undefined") localStorage.removeItem(key)
  }
}

export default AppLocalStorage
