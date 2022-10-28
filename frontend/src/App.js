import logo from "./logo.svg"
import Jobs from "./components/Jobs"
import Search from "./components/Search"

function App() {
  return (
    <div className="App container ">
      <h2 className="app-title">Pocket Money Web Application</h2>

      <Search />

      <div className="columns-1">
        <Jobs />
      </div>
    </div>
  )
}

export default App
