import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import CaseStudyPage, { dynamicParams, generateMetadata, generateStaticParams } from "./page";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const renderSlug = (slug: string) => render(<CaseStudyPage params={{ slug }} />);

describe("case study page", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", IO));

  it("generateStaticParams returns the 4 slugs in order", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "brandstream" },
      { slug: "icontent" },
      { slug: "itranslate" },
      { slug: "rag-prototype" },
    ]);
    expect(dynamicParams).toBe(false);
  });

  it("unknown slug calls notFound", () => {
    expect(() => renderSlug("foo")).toThrow("NEXT_NOT_FOUND");
  });

  it('brandstream page shows "Result" and "Replaced Magnific for every internal team."', () => {
    renderSlug("brandstream");
    expect(screen.getByRole("heading", { level: 1, name: "BrandStream" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Result" })).toBeInTheDocument();
    expect(screen.getAllByText("Replaced Magnific for every internal team.").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it('rag-prototype page shows "Prototype" and has no "Result" or "Outcome" heading', () => {
    renderSlug("rag-prototype");
    expect(screen.getByText("Prototype")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Result" })).toBeNull();
    expect(screen.queryByText("Outcome")).toBeNull();
  });

  it("next link on itranslate points to /work/rag-prototype and on rag-prototype to /work/brandstream", () => {
    const { unmount } = renderSlug("itranslate");
    expect(screen.getByRole("link", { name: /Next case study/ })).toHaveAttribute("href", "/work/rag-prototype");
    unmount();
    renderSlug("rag-prototype");
    expect(screen.getByRole("link", { name: /Next case study/ })).toHaveAttribute("href", "/work/brandstream");
  });

  it("metadata title names the project", () => {
    expect(generateMetadata({ params: { slug: "icontent" } }).title).toBe("iContent, Shreyash Arali");
  });

  it("shows each frame's detail text", () => {
    renderSlug("icontent");
    expect(screen.getByText("An agent breaks the document into a chapter structure.")).toBeInTheDocument();
  });
});
