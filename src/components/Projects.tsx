import React, { useState, useEffect } from "react";

import githubLogo from "../assets/links/github.svg";
import newWindow from "../assets/newWindow.svg";
import backgroundStroke from "../assets/strokes/background-stroke.png";

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sheety.co/a4086d3d6f9ed03996e1169108d1fd8e/portfolio/hoja1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await response.json();
        console.log(`feteched data is :${JSON.stringify(fetchedData.hoja1)}`);
        setProjects(fetchedData.hoja1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="projects">
      <div className="background"></div>
      <div className="content">
        <img className="background-stroke first" src={backgroundStroke} />
        <img className="background-stroke second" src={backgroundStroke} />

        <h2>Portfolio</h2>
        <h3>Estos son algunos de mis mejores projectos </h3>
        {!loading && (
          <div className="container">
            {projects.map((project) => {
              return <ProjectCard projectData={project} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

interface Project {
  name: string;
  description: string;

  thumbnail: string;
  repository: string;
  live: string;
  technologies: string;
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
          {projectData.technologies.split(",").map((technology) => (
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
  );
}
