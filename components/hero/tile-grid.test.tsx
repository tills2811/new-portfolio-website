import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TileGrid from "./tile-grid";

let intersecting = true;
class IO {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe(el: Element) {
    this.cb([{ isIntersecting: intersecting, target: el } as IntersectionObserverEntry], this as never);
  }
  unobserve() {}
  disconnect() {}
}

const lines = () => screen.getAllByTestId("tile").map((t) => t.getAttribute("data-line"));
const label = () => screen.getByTestId("journey-project").textContent;
const SETTLE = 6 * 90 + 700;

describe("TileGrid (build journey)", () => {
  beforeEach(() => {
    intersecting = true;
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", IO);
    Object.defineProperty(document, "hidden", { value: false, configurable: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("first render shows BrandStream's journey, Idea to Adopted", () => {
    render(<TileGrid />);
    expect(label()).toMatch(/BrandStream/);
    const stages = screen.getAllByTestId("tile").map((t) => t.getAttribute("data-stage"));
    expect(stages).toEqual(["Idea", "POC", "Prototype", "v1", "Production", "Adopted"]);
    expect(lines()[5]).toBe("Replaced Magnific");
  });

  it("Next project switches the label now and repaints every tile", () => {
    render(<TileGrid />);
    const before = lines();
    fireEvent.click(screen.getByRole("button", { name: "Next project" }));
    expect(label()).toMatch(/iContent/);
    act(() => vi.advanceTimersByTime(SETTLE));
    lines().forEach((l, i) => expect(l).not.toBe(before[i]));
  });

  it("cycles to the next project on its own every 8s", () => {
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(8000));
    expect(label()).toMatch(/iContent/);
    act(() => vi.advanceTimersByTime(8000));
    expect(label()).toMatch(/iTranslate/);
    act(() => vi.advanceTimersByTime(8000));
    expect(label()).toMatch(/BrandStream/);
  });

  it("does not auto-cycle while the pointer is over the grid", () => {
    render(<TileGrid />);
    fireEvent.mouseEnter(screen.getByTestId("tiles"));
    act(() => vi.advanceTimersByTime(20000));
    expect(label()).toMatch(/BrandStream/);
  });

  it("does not auto-cycle when document.hidden", () => {
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(20000));
    expect(label()).toMatch(/BrandStream/);
  });

  it("does not auto-cycle when out of view", () => {
    intersecting = false;
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(20000));
    expect(label()).toMatch(/BrandStream/);
  });

  it("with reduced motion: no auto-cycle, Next project repaints instantly without swap class", () => {
    window.__reduceMotion = true;
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(20000));
    expect(label()).toMatch(/BrandStream/);
    fireEvent.click(screen.getByRole("button", { name: "Next project" }));
    expect(lines()[5]).toBe("Courses in 2–4 hours");
    for (const t of screen.getAllByTestId("tile")) expect(t).not.toHaveClass("swap");
  });

  it("clicking Next project resets the auto timer", () => {
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(6000));
    fireEvent.click(screen.getByRole("button", { name: "Next project" }));
    act(() => vi.advanceTimersByTime(6000));
    expect(label()).toMatch(/iContent/);
  });

  it("tiles are aria-hidden and the journey is described in text", () => {
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("How each product went from idea to production.")).toBeInTheDocument();
  });
});
