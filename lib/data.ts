import notetakingappImg from "@/public/notetakingapp.png";
import portfolioImg from "@/public/portfolio.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated Computer Engineering",
    location: "Pune, Maharashtra",
    description:
      "I graduated with a degree in Computer Engineering from MMCOE, Pune, with an aggregate CGPA of 8.8.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2019 - May 2023",
  },
  {
    title: "Web Developer / Designer Intern",
    location: "Remote",
    description:
      "I worked as a Web Developer / Designer Intern at Aniworks Pvt. Ltd. for almost a year, where I enhanced organizational efficiency and led UI design projects.",
    icon: React.createElement(FaReact),

    date: "Feb 2022 - Nov 2022",
  },
  {
    title: "Software Developer",
    location: "Pune, Maharashtra",
    description:
      "Currently working as a Software Developer at Harbinger Group, focusing on GenAI-based projects with a core stack that includes React, Next.js, Node.js, and MongoDB. Check CV for more info.",
    icon: React.createElement(CgWorkAlt),
    date: "July 2023 - present",
  },
] as const;

export const projectsData = [
  {
    title: "AI Note-Taking App",
    description:
      "AI note-taking app using NextJS 13 for seamless navigation. Integrated DALLE AI Image Generation and OpenAI's Language Model API to enhance user experience.",
    tags: ["NextJS 13", "DALLE AI", "OpenAI", "Shadcn", "Tailwind CSS"],
    imageUrl: notetakingappImg,
    link: "https://noteapp-flame.vercel.app/",
  },

  {
    title: "Portfolio Website",
    description:
      "Built a portfolio website with Next.js 14, using server actions and framer motion animations. Deployed on Vercel for performance and reliability.",
    tags: ["Next.js 14", "Server Actions", "Framer Motion", "Vercel"],
    imageUrl: portfolioImg, // make sure to replace this with the actual image URL or variable for the portfolio website image
    link: "https://tills2811.github.io/Portfolio-Website/",
  },

  // {
  //   title: "Word Analytics",
  //   description:
  //     "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
  //   tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
  //   imageUrl: wordanalyticsImg,
  // },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "Express",
  "GenAI",
  "Langchain",
  "Next.js server actions",
] as const;
