import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getProject } from "@/lib/data";
import Frames from "./frames";

let instance: { cb: IntersectionObserverCallback; opts?: IntersectionObserverInit; el?: Element } | null = null;
class IO {
  cb: IntersectionObserverCallback;
  opts?: IntersectionObserverInit;
  constructor(cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
    this.cb = cb;
    this.opts = opts;
    instance = this as never;
  }
  observe(el: Element) {
    (instance as { el?: Element }).el = el;
  }
  unobserve() {}
  disconnect() {}
}
const fire = (isIntersecting: boolean) =>
  act(() => instance!.cb([{ isIntersecting, target: instance!.el } as IntersectionObserverEntry], instance as never));

const bs = getProject("brandstream")!;

describe("Frames", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", IO));
  afterEach(() => vi.unstubAllGlobals());

  it('frames get "in" class once the row reaches the upper 65% of the viewport, and keep it after leaving', () => {
    render(<Frames frames={bs.frames} />);
    const row = screen.getByTestId("frames");
    // A ratio threshold can be unreachable for a row taller than the viewport;
    // a root margin always triggers once the row's top passes 65% of the viewport.
    expect(instance!.opts?.threshold ?? 0).toBe(0);
    expect(instance!.opts?.rootMargin).toBe("0px 0px -35% 0px");
    expect(row).not.toHaveClass("in");
    fire(true);
    expect(row).toHaveClass("in");
    fire(false);
    expect(row).toHaveClass("in");
  });

  it("reduced motion renders frames visible immediately", () => {
    window.__reduceMotion = true;
    render(<Frames frames={bs.frames} />);
    expect(screen.getByTestId("frames")).toHaveClass("in");
  });

  it("frames are numbered 1..n", () => {
    render(<Frames frames={bs.frames} />);
    expect(screen.getAllByTestId("frame-n").map((n) => n.textContent)).toEqual(["1", "2", "3", "4"]);
  });

  it("loopNote renders when given", () => {
    render(<Frames frames={bs.frames} loopNote={bs.loopNote} />);
    expect(screen.getByText("Step 4 feeds back into step 2.")).toBeInTheDocument();
  });
});
