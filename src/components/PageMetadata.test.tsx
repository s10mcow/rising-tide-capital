import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PageMetadata from "./PageMetadata";

describe("page anchor navigation", () => {
  let container: HTMLDivElement;
  let root: Root;
  const scroll = vi.fn();
  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    scroll.mockReset();
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("scrollIntoView", scroll);
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scroll,
    });
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });
  it("scrolls to a cross-page anchor when its lazy content arrives", async () => {
    act(() =>
      root.render(
        <MemoryRouter initialEntries={["/contracting#project-inquiry"]}>
          <PageMetadata />
        </MemoryRouter>,
      ),
    );
    expect(scroll).not.toHaveBeenCalled();
    const target = document.createElement("section");
    target.id = "project-inquiry";
    await act(async () => {
      container.append(target);
    });
    expect(scroll).toHaveBeenCalledOnce();
    expect(document.title).toContain("Rising Tide Contracting");
  });
  it("scrolls to the top for a normal page", () => {
    act(() =>
      root.render(
        <MemoryRouter initialEntries={["/closing-process"]}>
          <PageMetadata />
        </MemoryRouter>,
      ),
    );
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(scroll).not.toHaveBeenCalled();
  });
});
