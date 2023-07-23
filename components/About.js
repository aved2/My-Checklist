import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div className = 'about'>
      <h3>Version 1.0.0</h3>
      <h4 className = 'desc'>My Checklist is a React JS implementation project creating a fully functioning UI, complete with HTML/CSS Styling, Interactive UI Components, Fetch API, and Routing. It is fully compatible with  back-end databases (JSON db was used in this project).</h4>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default About
