import React, { Component } from "react"
import JobItem from "./JobItem"
import { Link } from "react-router-dom"
import axios from "axios"

export class Jobs extends Component {
  state = {
    jobs: [],
    isLoaded: false,
  }

  componentDidMount() {
    axios
      .get("/wp-json/wp/v2/jobs")
      .then((res) =>
        this.setState({
          jobs: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err))
  }

  render() {
    // console.log(this.state)

    const { jobs, isLoaded } = this.state

    if (isLoaded) {
      return (
        <div>
          {jobs.map((job, index) => (
            <JobItem key={index} job={job} />
          ))}
        </div>
      )
    }
    return <div className="text-center">Loading...</div>
  }
}

export default Jobs
