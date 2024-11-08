import React from "react"
import Reveal from "./Reveal"
import checkMark from "../assets/check-mark.svg"
import cornerStroke from "../assets/strokes/corner-stroke.svg"
import bottomStroke from "../assets/strokes/bottom-stroke.svg"

export default function AboutMe() {
  const goals = [
    {
      title: "Responsivas",
      description:
        "Mis aplicaciones se adaptan perfectamente a cualquier dispositivo, garantizando una experiencia de usuario fluida.",
    },
    {
      title: "Fácil de mantener",
      description:
        "Código modular y legible para facilitar la comprensión, mantenimiento y escalabilidad.",
    },
    {
      title: "Escalables",
      description:
        "Las aplicaciones están diseñadas para crecer junto con las necesidades del negocio.",
    },
    {
      title: "Seguras",
      description:
        "Implemento buenas prácticas de seguridad para proteger los datos y la integridad de las aplicaciones.",
    },
    {
      title: "Uso de tecnologías modernas",
      description:
        "Trabajo con las últimas tecnologías para ofrecer soluciones rápidas y eficientes.",
    },
    {
      title: "Desempeño óptimo",
      description:
        "Mis aplicaciones están optimizadas para un rendimiento veloz y eficiente, tanto en el front-end como en el back-end.",
    },
  ]

  return (
    <section id="about">
      <div className="background"></div>
      <div className="content">
        <h2>Sobre mi</h2>
        <h3>Mi objetivo es hacer paginas que sean:</h3>
        <div className="container">
          {goals.map((goal, index) => (
            <Reveal direction={index % 2 === 0 ? "left" : "right"}>
              <Card goal={goal} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

interface Goal {
  title: string
  description: string
}

function Card({ goal }: { goal: Goal }) {
  return (
    <div className={`card`}>
      <img className="corner-stroke" src={cornerStroke} />
      <img className="checkmark" src={checkMark} alt="check mark" />
      <div>
        <h4 className="tittle">{goal.title}</h4>
      </div>
      <p className="description">{goal.description}</p>
      <img className="bottom-stroke" src={bottomStroke} alt="" />
    </div>
  )
}
