import { contactLinks } from "@/lib/data";
import ContactForm from "./contact-form";
import QuickAnswers from "./quick-answers";

const darkPill = "pill !border-black !bg-black !text-butter";
const ghostPill = "pill !border-black !bg-transparent !text-black";

export default function Contact() {
  return (
    <section id="contact" className="wrap pt-[110px]">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 rounded-[10px] bg-butter p-6 text-black min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:p-14">
        <div>
          <h2 className="cond text-[clamp(52px,6vw,88px)]">Hiring for a full-stack or AI role?</h2>
          <p className="mb-[26px] mt-5 max-w-[40ch] text-lg">
            I&apos;m open to remote or Pune-based roles, and I&apos;d relocate for the right team.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a className={darkPill} href={`mailto:${contactLinks.email}`}>
              Email me
            </a>
            <a className={ghostPill} href={contactLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={ghostPill} href={contactLinks.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <ContactForm />
        </div>
        <QuickAnswers />
      </div>
    </section>
  );
}
