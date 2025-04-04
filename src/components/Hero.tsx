import React, { useRef, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
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
      allSkill {
        nodes {
          name
          logo
        }
      }
    }
  `)

  const title = data.hero.title
  const description = data.hero.description
  const skills = data.allSkill.nodes

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
        <Skills skills={skills} />
      </div>
    </section>
  )
}

function Skills({ skills }) {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={6}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="skills-swiper"
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {skills.map((skill, index) => (
          <SwiperSlide key={skill.name}>
            <div className="skill-item">
              <img src={skill.logo} alt={skill.name} draggable="false" />
              <div className="tooltip">{skill.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
