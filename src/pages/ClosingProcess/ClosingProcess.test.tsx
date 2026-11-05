import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ClosingProcess from "./ClosingProcess";

describe("closing process", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("keeps the timeline and omits the retired closing-team providers", () => {
    act(() => {
      root.render(
        <MemoryRouter>
          <ClosingProcess />
        </MemoryRouter>,
      );
    });
    expect(container.textContent).toContain("Know what");
    expect(container.textContent).toContain("Questions along the way?");
    expect(container.textContent).toContain(
      "Documents are returned to the title company.",
    );
    expect(container.textContent).not.toContain("Your closing team");
    expect(container.textContent).not.toContain("Steel City Title");
    expect(container.textContent).not.toContain("ClosingLock");
    expect(container.querySelector(".resource-grid")).toBeNull();
    expect(
      container.querySelector('a[href="https://steelcitytitle.com"]'),
    ).toBeNull();
    expect(
      container.querySelector('a[href="https://closinglock.com"]'),
    ).toBeNull();
  });
});
