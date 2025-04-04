/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const crypto = require("crypto")
require("dotenv").config()

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions

  const fetchProjectsData = async () => {
    const apiUrl = process.env.GATSBY_PROJECTS_API_URL
    console.log(`projects url`)
    console.log(apiUrl)
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error("Request failed")
    }
    // Get the last segment of the URL path (in this case, 'projects')
    const parts = apiUrl.split("/")
    const lastSegment = parts[parts.length - 1]
    const data = await response.json()
    const projectsData = data[lastSegment]
    return projectsData
  }

  const fetchHeroData = async () => {
    const apiUrl = process.env.GATSBY_HERO_API_URL
    console.log(`hero url`)
    console.log(apiUrl)
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error("Request failed")
    }
    // Get the last segment of the URL path (in this case, 'projects')
    const parts = apiUrl.split("/")
    const lastSegment = parts[parts.length - 1]
    const data = await response.json()
    const heroData = data[lastSegment]
    return heroData
  }

  const fetchSkillsData = async () => {
    const apiUrl = process.env.GATSBY_SKILLS_API_URL
    console.log(`skills url`)
    console.log(apiUrl)
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error("Request failed")
    }
    const parts = apiUrl.split("/")
    const lastSegment = parts[parts.length - 1]
    const data = await response.json()
    const skillsData = data[lastSegment]
    return skillsData
  }

  try {
    // Await for results
    const projectsData = await fetchProjectsData()
    const heroData = await fetchHeroData()
    const skillsData = await fetchSkillsData()
    //
    const projects = projectsData
    // heroData is an array with a single hero object, so we take the first (and only) item
    const hero = heroData[0]
    const skills = skillsData
    console.log(JSON.stringify(projects))
    // Map into these results and create nodes
    projects.forEach((project, index) => {
      // Create your node object

      const productNode = {
        // Required fields
        id: `${project.name}-${index}`,

        parent: `__SOURCE__`,
        internal: {
          type: `Project`, // name of the graphQL query
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with GraphQL

        name: project.name,

        description: project.description,
        thumbnail: project.thumbnail,
        repository: project.repository,
        live: project.live,
        technologies: project.technologies,
        // etc...
      }

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(productNode))
        .digest(`hex`)
      // Add it to userNode
      productNode.internal.contentDigest = contentDigest

      // Create node with the Gatsby createNode() API
      createNode(productNode)
    })

    ////////////////////////////

    const heroNode = {
      // Required fields
      id: `${hero.title}`,

      parent: `__SOURCE__`,
      internal: {
        type: `Hero`, // name of the graphQL query
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with GraphQL

      title: hero.title,

      description: hero.description,
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(heroNode))
      .digest(`hex`)
    // Add it to userNode
    heroNode.internal.contentDigest = contentDigest

    // Create node with the Gatsby createNode() API
    createNode(heroNode)

    // Create skills nodes
    skills.forEach((skill, index) => {
      const skillNode = {
        id: `skill-${skill.name}-${index}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Skill`,
        },
        children: [],
        name: skill.name,
        logo: skill.logo, // This will be the fixed URL from the imported SVG
      }

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(skillNode))
        .digest(`hex`)
      // Add it to skillNode
      skillNode.internal.contentDigest = contentDigest

      // Create node with the Gatsby createNode() API
      createNode(skillNode)
    })
  } catch (error) {
    console.error("Error fetching data from the API:", error)
  }

  return
}
