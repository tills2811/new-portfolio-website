import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeContextProvider from "@/context/theme-context";
import ThemeToggle from "./theme-toggle";

function setup() {
  render(
    <ThemeContextProvider>
      <ThemeToggle />
    </ThemeContextProvider>
  );
  return screen.getByRole("button", { name: /dark mode/i });
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });
  afterEach(() => vi.restoreAllMocks());

  it("clicking toggles the dark class on <html> and aria-pressed", () => {
    const btn = setup();
    expect(btn).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(btn);
    expect(document.documentElement).toHaveClass("dark");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(btn);
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it('persists "dark" to localStorage', () => {
    fireEvent.click(setup());
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("still toggles when localStorage.setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const btn = setup();
    expect(() => fireEvent.click(btn)).not.toThrow();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("starts from the class set by the no-flash script", () => {
    document.documentElement.classList.add("dark");
    expect(setup()).toHaveAttribute("aria-pressed", "true");
  });
});
