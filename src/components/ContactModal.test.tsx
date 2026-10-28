import { readFileSync } from "node:fs";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactModal from "./ContactModal";

describe("property contact form", () => {
  let container: HTMLDivElement;
  let root: Root;
  const fetchMock = vi.fn();
  const close = vi.fn();
  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    fetchMock.mockReset();
    close.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    act(() => root.render(<ContactModal isOpen handleClose={close} />));
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });
  function fill() {
    for (const [name, value] of Object.entries({
      name: "  Test Owner  ",
      email: "owner@example.com",
      phone: "9045550100",
      message: "  A vacant parcel in Florida.  ",
    })) {
      document.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value =
        value;
    }
  }
  async function submit() {
    await act(async () => {
      document
        .querySelector("form")!
        .dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
    });
  }
  it("registers all contact fields with Netlify", () => {
    const staticDoc = new DOMParser().parseFromString(
      readFileSync("index.html", "utf8"),
      "text/html",
    );
    const schema = staticDoc.querySelector('form[name="contact"]')!;
    for (const field of Array.from(document.querySelectorAll("form [name]")))
      expect(
        schema.querySelector(`[name="${field.getAttribute("name")}"]`),
      ).not.toBeNull();
  });
  it("keeps the message available for retry on a failed response", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    fill();
    await submit();
    expect(document.querySelector('[role="alert"]')?.textContent).toContain(
      "couldn’t send",
    );
    expect(document.querySelector('[role="status"]')).toBeNull();
    expect(close).not.toHaveBeenCalled();
    expect(
      document.querySelector<HTMLTextAreaElement>("textarea")!.value,
    ).toContain("vacant parcel");
    expect(document.querySelector("fieldset")!.disabled).toBe(false);
  });
  it("confirms success only after acceptance and sends trimmed fields", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    fill();
    await submit();
    const [url, options] = fetchMock.mock.calls[0];
    const data = new URLSearchParams(options.body);
    expect(url).toBe("/");
    expect(options.method).toBe("POST");
    expect(data.get("form-name")).toBe("contact");
    expect(data.get("name")).toBe("Test Owner");
    expect(data.get("message")).toBe("A vacant parcel in Florida.");
    expect(document.querySelector('[role="status"]')?.textContent).toContain(
      "Message received",
    );
  });
  it("blocks whitespace-only required values before sending", async () => {
    fill();
    document.querySelector<HTMLInputElement>('[name="name"]')!.value = "  ";
    await submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(document.querySelector('[role="alert"]')).not.toBeNull();
  });
});
