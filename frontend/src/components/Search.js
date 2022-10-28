import React from "react"

const Search = () => {
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm job-search-field" placeholder="Search a job ..." type="text" name="search" />
      </label>
    </div>
  )
}

export default Search
