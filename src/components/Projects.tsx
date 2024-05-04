import React, { useState, useEffect } from "react"

import githubLogo from "../assets/links/github.svg"
import newWindow from "../assets/newWindow.svg"
import backgroundStroke from "../assets/strokes/background-stroke.png"
import { useStaticQuery, graphql } from "gatsby"
export default function Projects() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      projects: allProject {
        nodes {
          name
          thumbnail
          description
          live
          repository
          technologies
          id
        }
      }
    }
  `)

  console.log(`data is ${JSON.stringify(data)}`)

  const projects = data.projects.nodes

  return (
    <section id="projects">
      <div className="background"></div>
      <div className="content">
        <img className="background-stroke first" src={backgroundStroke} />
        <img className="background-stroke second" src={backgroundStroke} />

        <h2>Portfolio</h2>
        <h3>Estos son algunos de mis mejores projectos </h3>

        <div className="container">
          {projects.map(project => {
            return <ProjectCard projectData={project} />
          })}
        </div>
      </div>
    </section>
  )
}

interface Project {
  name: string
  description: string

  thumbnail: string
  repository: string
  live: string
  technologies: string
}

function ProjectCard({ projectData }: { projectData: Project }) {
  return (
    <div className="project-card">
      <div className="thumbnail">
        <img src={projectData.thumbnail} alt="" />
      </div>

      <div className="description">
        <h3>{projectData.name}</h3>
        <p>{projectData.description}</p>
        <ul className="technologies">
          {projectData.technologies.split(",").map(technology => (
            <li>{technology}</li>
          ))}
        </ul>
        <ul className="links">
          <li>
            <a href={projectData.repository} rel="noreferrer" target="_blank">
              <span>Code </span>
              <img src={githubLogo} alt="" />
            </a>
          </li>
          <li>
            <a href={projectData.live} rel="noreferrer" target="_blank">
              <span>Ir a ver</span> <img src={newWindow} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
