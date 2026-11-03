import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Hero from "./hero";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Hero", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", IO));

  it("has the headline and the two calls to action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: "I take products from an empty repo to production." })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See my work" })).toHaveAttribute("href", "/#work");
    const cv = screen.getByRole("link", { name: "Download CV" });
    expect(cv).toHaveAttribute("href", "/CV.pdf");
    expect(cv).toHaveAttribute("download");
  });
});
