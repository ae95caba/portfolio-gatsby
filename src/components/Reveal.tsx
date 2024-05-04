import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: JSX.Element;

  direction: "left" | "right";
}

export default function Reveal({
  children,

  direction,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
      className={`subcontainer ${
        direction === "left" ? "subcontainer-left" : "subcontainer-right"
      }`}
      style={{ position: "relative" }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: direction === "left" ? 350 : -350 },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        style={{ marginLeft: direction === "left" ? "auto" : "" }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
