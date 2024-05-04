/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const crypto = require("crypto")

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

  const fetchProjects = async () => {
    const response = await fetch(
      "https://api.sheety.co/a4086d3d6f9ed03996e1169108d1fd8e/portfolio/hoja1"
    )

    if (!response.ok) {
      throw new Error("Request failed")
    }

    const data = await response.json()
    console.log(`data is : ${JSON.stringify(data)}`)
    return data
  }

  try {
    // Await for results
    const projects = await fetchProjects()

    // Map into these results and create nodes
    projects.hoja1.forEach((project, index) => {
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
  } catch (error) {
    console.error("Error fetching data from the API:", error)
  }

  return
}
