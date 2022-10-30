import logo from "./logo.svg";
import Jobs from "./components/Jobs";
import Search from "./components/Search";
import JobCreate from "./components/JobCreate";

function App() {
  return (
    <div className="App container ">
      <div className="flex justify-between">
        <h2 className="app-title">Pocket Money Web Application</h2>
        <button className=" rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post A Task
        </button>
      </div>
      <Search />

      <div className="columns-1">
        <Jobs />
      </div>
      <div>
        {" "}
        <JobCreate />{" "}
      </div>
    </div>
  );
}

export default App;
