import React from "react";
import Reveal from "./Reveal";
import checkMark from "../assets/check-mark.svg";
import cornerStroke from "../assets/strokes/corner-stroke.svg";
import bottomStroke from "../assets/strokes/bottom-stroke.svg";

export default function AboutMe() {
  const goals = [
    {
      title: "Responsivas",
      description:
        "El diseño debe ser responsivo y visualmente atractivo en todos los dispositivos.",
    },
    {
      title: "Fácil de mantener",
      description:
        "El código debe ser escrito con claridad, modularidad y legibilidad en mente, para facilitar el debugging, la comprensión y la extensibilidad.",
    },
    {
      title: "Usar las ultimas tecnologías",
      description:
        "Los proyectos deben usar las ultimas tecnologías para obtener una ventaja ante la competencia",
    },
    {
      title: "Atractivos visualmente",
      description:
        "El diseño debe priorizar la UX (experiencia de usuario) y apuntar a una UI (interfaz de usuario) bien pulida ",
    },
  ];
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
  );
}

interface Goal {
  title: string;
  description: string;
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
  );
}
