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

const tiles = () => screen.getAllByTestId("tile");
const active = () => tiles().findIndex((t) => t.getAttribute("data-active") === "true");
const REVEAL = 6 * 120 + 600;
const STEP = 1600;

describe("TileGrid (method)", () => {
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

  it("renders the six method stages in order", () => {
    render(<TileGrid />);
    expect(tiles().map((t) => t.getAttribute("data-stage"))).toEqual([
      "Idea",
      "POC",
      "Prototype",
      "v1",
      "Production",
      "Adopted",
    ]);
    expect(screen.queryByRole("button", { name: "Next project" })).toBeNull();
  });

  it('reveals the tiles once in view ("in" class on the grid)', () => {
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).toHaveClass("in");
  });

  it("does not reveal while out of view", () => {
    intersecting = false;
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).not.toHaveClass("in");
  });

  it("after the reveal, the highlight walks one stage every 1.6s and wraps", () => {
    render(<TileGrid />);
    expect(active()).toBe(-1);
    act(() => vi.advanceTimersByTime(REVEAL));
    expect(active()).toBe(0);
    act(() => vi.advanceTimersByTime(STEP));
    expect(active()).toBe(1);
    act(() => vi.advanceTimersByTime(STEP * 5));
    expect(active()).toBe(0);
  });

  it("the highlight pauses while the pointer is over the grid", () => {
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(REVEAL));
    fireEvent.mouseEnter(screen.getByTestId("tiles"));
    act(() => vi.advanceTimersByTime(STEP * 3));
    expect(active()).toBe(0);
    fireEvent.mouseLeave(screen.getByTestId("tiles"));
    act(() => vi.advanceTimersByTime(STEP));
    expect(active()).toBe(1);
  });

  it("on a touch device a tap on the grid does not freeze the highlight", () => {
    window.__noHover = true;
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(REVEAL));
    fireEvent.mouseEnter(screen.getByTestId("tiles"));
    act(() => vi.advanceTimersByTime(STEP * 2));
    expect(active()).toBe(2);
  });

  it("the highlight pauses when document.hidden", () => {
    render(<TileGrid />);
    act(() => vi.advanceTimersByTime(REVEAL));
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    act(() => vi.advanceTimersByTime(STEP * 3));
    expect(active()).toBe(0);
  });

  it("with reduced motion: revealed immediately and no walking highlight", () => {
    window.__reduceMotion = true;
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).toHaveClass("in");
    act(() => vi.advanceTimersByTime(REVEAL + STEP * 4));
    expect(active()).toBe(-1);
  });

  it("tiles are aria-hidden; the proof line links to the three case studies", () => {
    render(<TileGrid />);
    expect(screen.getByTestId("tiles")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText(/Done three times:/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "BrandStream" })).toHaveAttribute("href", "/work/brandstream");
    expect(screen.getByRole("link", { name: "iContent" })).toHaveAttribute("href", "/work/icontent");
    expect(screen.getByRole("link", { name: "iTranslate" })).toHaveAttribute("href", "/work/itranslate");
  });
});
