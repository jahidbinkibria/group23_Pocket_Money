<h1>Group23 : Project Pocket Money</h1>

<h2>1 Introduction</h2>

<h3>1.1 Purpose and scope of project</h3>

This documentation outlines the plan of the project “Pocket Money '' which was offered by Hadaytullah Kundi for the course work COMP.SE 610 and COMP.SE.620 Software engineering project 1 and 2.

The project consists of seven (7) team members from both software engineering 1 and 2.The purpose of this document is to outline the project's objectives, management,
iterations, specifications, and hazards. It is also made for helping the development
team, the client and the university course staff. The goal of this project is to create pocket money that is a web based application. When necessary, this project plan will be revised during the process.

The scope of this project includes planning ,design, flow architecture, implementation (build), testing and deployment of a web application which should also be mobile sfriendly.

<h3>1.1 Json API End Points</h3>

\*\* Update those URL later.

http://localhost:9000/wp-json/wp/v2/jobs

http://localhost:9000/wp-json/wp/v2/jobs?\_fields=author,id,excerpt,title,link

http://localhost:9000/wp-json/wp/v2/search

http://localhost:9000/wp-json/wp/v2/add

http://localhost:9000/wp-json/wp/v2/edit/{$id}

http://localhost:9000/wp-json/wp/v2/delete/{$id}

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
