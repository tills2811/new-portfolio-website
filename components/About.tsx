"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import React from "react";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me </SectionHeading>
      <p>
        After graduating with a degree in{" "}
        <span className="font-medium">Computer Engineering</span>, I started my
        career in software development. I have worked extensively in{" "}
        <span className="font-medium">full-stack web development</span>, gaining
        valuable experience across various projects.{" "}
        <span className="italic">My favorite part of programming</span> is
        creating efficient and scalable solutions that solve real-world
        problems. My core stack includes{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . I am also proficient in JavaScript, Redux Toolkit, and GitHub, and I
        am constantly expanding my skill set. Currently, I am looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        volleyball, watching movies, and exploring new technologies. Recently, I
        have been delving into{" "}
        <span className="font-medium">artificial intelligence</span> and
        learning GenAI technologies like Langchain. In addition to my technical
        interests, I am learning about{" "}
        <span className="font-medium">history and philosophy</span>.
      </p>
    </motion.section>
  );
}
