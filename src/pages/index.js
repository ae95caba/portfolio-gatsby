import * as React from "react"

import Header from "../components/Header"

import Footer from "../components/Footer"
import Hero from "../components/Hero"
import AboutMe from "../components/AboutMe"
import Contact from "../components/Contact"
import Projects from "../components/Projects"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./index.scss"

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
