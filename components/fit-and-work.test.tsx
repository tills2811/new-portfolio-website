import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FitAndWork from "./fit-and-work";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const card = (id: string) => document.querySelector(`[data-project="${id}"]`) as HTMLElement;
const list = () => screen.getByTestId("work-list");
const skill = (name: string) => screen.getByRole("button", { name });

describe("FitAndWork", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", IO));

  it('hovering "Gemini" highlights only BrandStream', () => {
    render(<FitAndWork />);
    fireEvent.mouseEnter(skill("Gemini"));
    expect(list()).toHaveAttribute("data-dim", "true");
    expect(card("brandstream")).toHaveAttribute("data-hl", "true");
    for (const id of ["icontent", "itranslate", "rag-prototype"]) expect(card(id)).toHaveAttribute("data-hl", "false");
  });

  it('focusing "LangGraph" via keyboard highlights brandstream, icontent, itranslate and not rag-prototype', () => {
    render(<FitAndWork />);
    fireEvent.focus(skill("LangGraph"));
    for (const id of ["brandstream", "icontent", "itranslate"]) expect(card(id)).toHaveAttribute("data-hl", "true");
    expect(card("rag-prototype")).toHaveAttribute("data-hl", "false");
  });

  it("mouse leave / blur clears highlight", () => {
    render(<FitAndWork />);
    fireEvent.mouseEnter(skill("Gemini"));
    fireEvent.mouseLeave(skill("Gemini"));
    expect(list()).toHaveAttribute("data-dim", "false");
    fireEvent.focus(skill("Redis"));
    fireEvent.blur(skill("Redis"));
    expect(list()).toHaveAttribute("data-dim", "false");
  });

  it("moving the mouse over and off another skill keeps the keyboard-focused skill's highlight", () => {
    render(<FitAndWork />);
    fireEvent.focus(skill("Gemini"));
    fireEvent.mouseEnter(skill("MongoDB"));
    expect(card("icontent")).toHaveAttribute("data-hl", "true");
    fireEvent.mouseLeave(skill("MongoDB"));
    expect(list()).toHaveAttribute("data-dim", "true");
    expect(card("brandstream")).toHaveAttribute("data-hl", "true");
    expect(card("icontent")).toHaveAttribute("data-hl", "false");
  });

  it('hovering "Node.js" (uses []) sets no data-dim and no data-hl', () => {
    render(<FitAndWork />);
    fireEvent.mouseEnter(skill("Node.js"));
    expect(list()).toHaveAttribute("data-dim", "false");
    for (const id of ["brandstream", "icontent", "itranslate", "rag-prototype"])
      expect(card(id)).toHaveAttribute("data-hl", "false");
  });

  it("renders 4 roles and 4 layers", () => {
    render(<FitAndWork />);
    expect(screen.getAllByTestId("role")).toHaveLength(4);
    expect(screen.getAllByTestId("layer")).toHaveLength(4);
  });

  it('prototype card shows "Prototype" and no "Outcome"', () => {
    render(<FitAndWork />);
    const proto = within(card("rag-prototype"));
    expect(proto.getByText(/Prototype/)).toBeInTheDocument();
    expect(proto.queryByText("Outcome")).toBeNull();
    expect(proto.getByRole("link", { name: "How it works" })).toHaveAttribute("href", "/work/rag-prototype");
  });

  it("case cards link to their case study pages", () => {
    render(<FitAndWork />);
    expect(within(card("brandstream")).getByRole("link", { name: "Read the case study" })).toHaveAttribute(
      "href",
      "/work/brandstream"
    );
  });
});
