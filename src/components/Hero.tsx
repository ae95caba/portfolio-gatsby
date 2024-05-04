import React from "react"

import skills from "../assets/data/skills/skills"
import { useStaticQuery, graphql } from "gatsby"
import stroke from "../assets/strokes/stroke.svg"
import wavingHand from "../assets/waving-hand.png"
import linkedinLogo from "../assets/links/linkedin.svg"
import githubLogo from "../assets/links/github.svg"
import resumeLogo from "../assets/links/resume.svg"
export default function Hero() {
  const data = useStaticQuery(graphql`
    query {
      hero {
        title
        description
      }
    }
  `)

  const title = data.hero.title
  const description = data.hero.description

  return (
    <section id="hero">
      <div className="background"></div>
      <div className="content">
        <div className="container">
          <div className="sub-container">
            <h1>{title}</h1>
            <img className="stroke" src={stroke} />
            <p>
              Hola, soy Andre Espinoza.
              <span>
                <img src={wavingHand} alt="waving hand" />
              </span>
              <br /> {description}
            </p>
            <ul className="links">
              <li>
                <a
                  href="https://github.com/ae95caba"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={githubLogo} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ae95caba/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={linkedinLogo} />
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1OziCV-znlTseo1aatXcee3ikgyjYw930/view?usp=sharing"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={resumeLogo} />
                </a>
              </li>
            </ul>
          </div>
          <div className="avatar"> </div>
        </div>
        <Skills />
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills">
      <div className="slider">
        <div className="box">Skills</div>
        <ul>
          {Object.keys(skills).map((skill, index) => (
            <li key={`${skill}-A`}>
              <img src={skills[skill]} alt={skill} />
              <div className="tooltip">{skill}</div>
            </li>
          ))}
        </ul>
        <ul>
          {Object.keys(skills).map((skill, index) => (
            <li key={`${skill}-B`}>
              <img src={skills[skill]} alt={skill} />
              <div className="tooltip">{skill}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
