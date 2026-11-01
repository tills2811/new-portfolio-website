"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {

  // Server and first client render agree on "light"; then mirror the class the
  // no-flash script already set, so there is no hydration mismatch.
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => setTheme(readInitialTheme()), []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // storage blocked: the choice just won't persist
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error("useTheme must be used within a ThemeContextProvider");
  return context;
}
