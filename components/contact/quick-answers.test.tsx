import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuickAnswers from "./quick-answers";

const answer = () => screen.getByTestId("answer");

describe("QuickAnswers", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('initial text is "Pick a question."', () => {
    render(<QuickAnswers />);
    expect(answer()).toHaveTextContent("Pick a question.");
    expect(answer()).toHaveAttribute("aria-live", "polite");
  });

  it('tapping "Notice period?" streams to "Two months." and sets aria-pressed', () => {
    render(<QuickAnswers />);
    const chip = screen.getByRole("button", { name: "Notice period?" });
    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    act(() => vi.advanceTimersByTime(16 * 3));
    expect(answer().textContent!.length).toBeLessThan("Two months.".length);
    expect(answer()).toHaveClass("typing");
    act(() => vi.advanceTimersByTime(16 * 20));
    expect(answer()).toHaveTextContent("Two months.");
    expect(answer()).not.toHaveClass("typing");
  });

  it("tapping a second chip mid-stream shows only the second answer's prefix, never mixed text", () => {
    render(<QuickAnswers />);
    fireEvent.click(screen.getByRole("button", { name: "Strongest project?" }));
    act(() => vi.advanceTimersByTime(16 * 10));
    fireEvent.click(screen.getByRole("button", { name: "Notice period?" }));
    for (let i = 0; i < 15; i++) {
      act(() => vi.advanceTimersByTime(16));
      expect("Two months.".startsWith(answer().textContent!)).toBe(true);
    }
    expect(answer()).toHaveTextContent("Two months.");
    expect(screen.getByRole("button", { name: "Strongest project?" })).toHaveAttribute("aria-pressed", "false");
  });

  it("reduced motion shows full answer immediately", () => {
    window.__reduceMotion = true;
    render(<QuickAnswers />);
    fireEvent.click(screen.getByRole("button", { name: "Remote or relocation?" }));
    expect(answer()).toHaveTextContent(/^Yes\. I'm open to remote/);
    expect(answer()).toHaveTextContent("strong opportunity.");
  });
});
