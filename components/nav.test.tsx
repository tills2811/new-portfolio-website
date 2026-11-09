import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemeContextProvider from "@/context/theme-context";
import Nav from "./nav";

const renderNav = () =>
  render(
    <ThemeContextProvider>
      <Nav />
    </ThemeContextProvider>
  );

describe("Nav", () => {
  it("links point to /#work, /#exp, /#contact", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#exp");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("phones get the section links too (a second row below 900px)", () => {
    renderNav();
    const row = screen.getByTestId("nav-links");
    expect(row.querySelectorAll("a")).toHaveLength(3);
    expect(row.querySelector('a[href="/#contact"]')).not.toBeNull();
  });

  it("CV link has download attribute and href /Shreyash_Arali_Resume.pdf", () => {
    renderNav();
    const cv = screen.getByRole("link", { name: "Download CV" });
    expect(cv).toHaveAttribute("href", "/Shreyash_Arali_Resume.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("sets data-scrolled after scroll > 8", () => {
    renderNav();
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scrolled", "false");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 20, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-scrolled", "true");
  });
});
