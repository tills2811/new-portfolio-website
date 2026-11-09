import { afterEach, describe, expect, it } from "vitest";
import { themeScript } from "./theme-script";

const run = () => new Function(themeScript)();
const original = Object.getOwnPropertyDescriptor(window, "localStorage")!;
const originalMM = window.matchMedia;

describe("themeScript", () => {
  afterEach(() => {
    Object.defineProperty(window, "localStorage", original);
    window.matchMedia = originalMM;
    document.documentElement.className = "";
  });

  it("falls back to the system theme when localStorage access throws", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
    window.matchMedia = ((q: string) => ({ matches: q.includes("dark") })) as never;
    expect(run).not.toThrow();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("a stored light choice wins over a dark system theme", () => {
    localStorage.setItem("theme", "light");
    window.matchMedia = ((q: string) => ({ matches: q.includes("dark") })) as never;
    run();
    expect(document.documentElement).not.toHaveClass("dark");
    localStorage.clear();
  });

  it('marks the document with "js" so hidden-until-animated styles only apply with JS', () => {
    run();
    expect(document.documentElement).toHaveClass("js");
  });
});
