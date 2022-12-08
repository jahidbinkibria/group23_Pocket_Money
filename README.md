<h1>Group23 : Project Pocket Money</h1>

<h2>1 Introduction</h2>

<h3>1.1 Purpose and scope of project</h3>

This documentation outlines the plan of the project “Pocket Money '' which was offered by Hadaytullah Kundi for the course work COMP.SE 610 and COMP.SE.620 Software engineering project 1 and 2.

The project consists of five (5) team members from both software engineering 1 and 2.The purpose of this document is to outline the project's objectives, management,
iterations, specifications, and hazards. It is also made for helping the development
team, the client and the university course staff. The goal of this project is to create pocket money that is a web based application. When necessary, this project plan will be revised during the process.

The scope of this project includes planning ,design, flow architecture, implementation (build), testing and deployment of a web application which should also be mobile sfriendly.

<h3>1.1 Json API End Points</h3>

- Search Job Posts:

End Point:
/wp-json/pmapi/v1/search

Method:
Get

Parameter: 
s = keyword

- Read All Job Posts:

End Point:
/wp-json/pmapi/v1/jobs

Method: 
Get

- Read A Single Job Post:

End Point:
/wp-json/pmapi/v1/job/

Method: 
Get

Parameter: 
p_id = 82c317c8-aa3d-42cf-88c5-81eef7c84262

- Create A Job Post:

End Point:
/wp-json/pmapi/v1/create

Method:
Post

Parameter: 
taskTitle,
taskDetails,
taskCategory,
firstName,
lastName,
contact,
email,
address,
city,
taskDay,
taskDuration,
taskPrice

- Edit A Job Post:

End Point:
/wp-json/pmapi/v1/edit

Method:
Post

Parameter: 

taskTitle,
taskDetails,
taskDay,
taskDuration,
taskPrice,
city


- Delete A Job Post:

End Point:
wp-json/pmapi/v1/delete

Method:
Delete

Parameter: 
jobId



<h4>Create A React App</h4>
npx create-react-app frontend

<h4>Sample React Component</h4>

<pre><code>import React, { Component } from "react"

export class Books extends React {
  state = {
    books: [],
  }

  render() {
    return <div></div>
  }
}

export default Books</code></pre>

<h4>VS Code Addon</h4>
ES7 React/Redux snippets

<h4>Tools, Addons & Frameworks</h4>
