"use client";

import { useEffect, useRef, useState } from "react";
import { quickAnswers } from "@/lib/data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const CHAR_MS = 16;

export default function QuickAnswers() {
  const [active, setActive] = useState<number | null>(null);
  const [text, setText] = useState("Pick a question.");
  const [typing, setTyping] = useState(false);
  const timer = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const stop = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const ask = (i: number) => {
    stop();
    setActive(i);
    const full = quickAnswers[i].a;
    if (reduced) {
      setTyping(false);
      setText(full);
      return;
    }
    let n = 0;
    setText("");
    setTyping(true);
    timer.current = window.setInterval(() => {
      n += 1;
      setText(full.slice(0, n));
      if (n >= full.length) {
        stop();
        setTyping(false);
      }
    }, CHAR_MS);
  };

  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold">Quick answers</p>
      <div role="group" aria-label="Questions" className="mb-[18px] flex flex-wrap gap-2">
        {quickAnswers.map((qa, i) => (
          <button
            key={qa.q}
            type="button"
            aria-pressed={active === i}
            onClick={() => ask(i)}
            className="rounded-full border-2 border-black px-3.5 py-[9px] text-[15px] font-semibold text-black aria-pressed:bg-black aria-pressed:text-butter"
          >
            {qa.q}
          </button>
        ))}
      </div>
      {/* Screen readers get the full answer once; the visual stream is hidden from them. */}
      <p data-testid="answer-live" aria-live="polite" className="sr-only">
        {active === null ? "" : quickAnswers[active].a}
      </p>
      <p
        data-testid="answer"
        aria-hidden="true"
        className={`min-h-[112px] rounded-lg bg-white px-5 py-[18px] text-[17px] leading-normal text-black ${
          typing ? "typing" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
}
