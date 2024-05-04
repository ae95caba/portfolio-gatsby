import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../assets/contact-me.json";

export default function Contact() {
  const contactMeAnimationRef = useRef<LottieRefCurrentProps>(null);

  return (
    <section id="contact">
      <div className="background"></div>
      <div className="content">
        <Lottie
          className="animation"
          lottieRef={contactMeAnimationRef}
          animationData={animationData}
          autoplay={true}
          loop={true}
        />
        <h2>Contacto</h2>
        <h3>No seas tímido, mandame un mensaje!</h3>
        <form name="contact" method="POST">
          <input type="hidden" name="form-name" value="contact" />
          <input name="bot-field" hidden />
          <input placeholder="Nombre" type="text" name="name" />
          <input type="email" placeholder="Email" name="email" />

          <textarea placeholder="Mensaje" name="message"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
