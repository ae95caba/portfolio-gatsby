import React, { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

import githubLogo from "../assets/links/github.svg"
import newWindow from "../assets/newWindow.svg"
import backgroundStroke from "../assets/strokes/background-stroke.png"
import { useStaticQuery, graphql } from "gatsby"
import PatternBackground from "./PatternBackground"

export default function Projects() {
  const data = useStaticQuery(graphql`
    query {
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
        <PatternBackground
          patternImage={backgroundStroke}
          opacity={1}
          gap={30}
          className="pattern-background"
        />

        <h2>Portfolio</h2>
        <h3>Estos son algunos de mis mejores projectos </h3>

        <div className="container">
          {projects.map(project => {
            return <ProjectCard key={project.id} projectData={project} />
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
  const thumbnailUrl = projectData.thumbnail
    ? projectData.thumbnail
    : "https://placehold.co/400x300/213547/FFFFFF?text=No+Image"

  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-20% 0%",
    amount: 0.5,
  })
  const mainControls = useAnimation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && isInView) {
      mainControls.start("visible")
    } else if (isMobile) {
      mainControls.start("hidden")
    }
  }, [isInView, isMobile])

  return (
    <div ref={ref} className="project-card">
      <div
        className={`thumbnail ${projectData.thumbnail ? "has-thumbnail" : ""}`}
      >
        {isMobile ? (
          <motion.img
            src={thumbnailUrl}
            alt={projectData.name}
            variants={{
              hidden: { y: 0 },
              visible: { y: "calc(-100% + 320px)" },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "100%",
              left: "0%",
              top: "0",
              height: "auto",
              minHeight: "100%",
            }}
          />
        ) : (
          <img src={thumbnailUrl} alt={projectData.name} />
        )}
      </div>

      <div className="description">
        <h3>{projectData.name}</h3>
        <p>
          <div
            className="description-content"
            ref={el => {
              if (el) {
                // Check if content overflows
                const hasOverflow = el.scrollHeight > el.clientHeight
                el.classList.toggle("overflow", hasOverflow)
              }
            }}
            onScroll={e => {
              const content = e.currentTarget
              const scrollableHeight =
                content.scrollHeight - content.clientHeight
              const scrollPercentage = Math.min(
                (content.scrollTop / scrollableHeight) * 70,
                70
              )
              const customScrollbar = content.nextElementSibling as HTMLElement
              if (customScrollbar) {
                customScrollbar.style.setProperty(
                  "--scroll-position",
                  `${scrollPercentage}%`
                )
              }
            }}
          >
            {projectData.description}
          </div>
          <div className="custom-scrollbar"></div>
        </p>
        <ul className="technologies">
          {projectData.technologies.split(",").map(technology => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <ul className="links">
          {projectData.repository && (
            <li>
              <a href={projectData.repository} rel="noreferrer" target="_blank">
                <span>Code </span>
                <img src={githubLogo} alt="" />
              </a>
            </li>
          )}
          {projectData.live && (
            <li>
              <a href={projectData.live} rel="noreferrer" target="_blank">
                <span>Ir a ver</span> <img src={newWindow} alt="" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
