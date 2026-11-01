import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { briefs } from "@/lib/data";
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

const variants = () => screen.getAllByTestId("tile").map((t) => t.getAttribute("data-variant"));

describe("TileGrid", () => {
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

  it("renders 6 tiles on first render", () => {
    render(<TileGrid />);
    expect(variants()).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("advances one tile every 1600ms", () => {
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(1600 + 300));
    expect(variants()).toEqual(["7", "2", "3", "4", "5", "6"]);
    act(() => vi.advanceTimersByTime(1600));
    expect(variants()).toEqual(["7", "8", "3", "4", "5", "6"]);
  });

  it("does not advance while pointer is over the grid", () => {
    render(<TileGrid />);
    fireEvent.mouseEnter(screen.getByTestId("tiles"));
    act(() => vi.advanceTimersByTime(5000));
    expect(variants()).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("does not advance when document.hidden", () => {
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(5000));
    expect(variants()).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("does not advance when out of view", () => {
    intersecting = false;
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(5000));
    expect(variants()).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("with reduced motion: no interval, Generate repaints instantly without swap class", () => {
    window.__reduceMotion = true;
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(5000));
    expect(variants()).toEqual(["1", "2", "3", "4", "5", "6"]);
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    expect(variants()).not.toContain("1");
    for (const t of screen.getAllByTestId("tile")) expect(t).not.toHaveClass("swap");
  });

  it("Generate updates brief text to the next brief", () => {
    render(<TileGrid />);
    expect(screen.getByText(briefs[0].text)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    expect(screen.getByText(briefs[1].text)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(6 * 90 + 300));
    expect(variants()).not.toContain("1");
  });

  it("tiles are aria-hidden and the caption is present", () => {
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Illustrative variants, not client work.")).toBeInTheDocument();
  });
});
