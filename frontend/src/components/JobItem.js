import React from "react"

const JobItem = ({ job }) => {
  return (
    <div className="job-single-item">
      <h2>{job.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: job.excerpt.rendered }} />
      <p className="job-price">Price: &euro; {job.acf.price}</p>
    </div>
  )
}

export default JobItem
