import { readFileSync } from "node:fs";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContractingInquiry from "./ContractingInquiry";

describe("contracting inquiry", () => {
  let container: HTMLDivElement;
  let root: Root;
  const fetchMock = vi.fn();

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    act(() =>
      root.render(
        <MemoryRouter
          initialEntries={[
            "/contracting?source=qr&utm_source=facebook&utm_campaign=land-home",
          ]}
        >
          <ContractingInquiry />
        </MemoryRouter>,
      ),
    );
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  function fillRequired() {
    const fields: Record<string, string> = {
      name: "  Test Investor  ",
      email: "test@example.com",
      propertyCounty: "Alachua",
      projectStage: "Land under contract",
    };
    for (const [name, value] of Object.entries(fields)) {
      const input = container.querySelector<
        HTMLInputElement | HTMLSelectElement
      >(`[name="${name}"]`)!;
      input.value = value;
    }
  }

  async function submit() {
    await act(async () => {
      container
        .querySelector("form")!
        .dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
    });
  }

  it("registers every submitted field in the static Netlify form", () => {
    const html = new DOMParser().parseFromString(
      readFileSync("index.html", "utf8"),
      "text/html",
    );
    const registered = html.querySelector('form[name="contracting-inquiry"]')!;
    expect(registered.getAttribute("data-netlify")).toBe("true");
    expect(registered.getAttribute("netlify-honeypot")).toBe("bot-field");
    for (const input of Array.from(container.querySelectorAll("form [name]"))) {
      expect(
        registered.querySelector(`[name="${input.getAttribute("name")}"]`),
      ).not.toBeNull();
    }
  });

  it("submits the project and campaign fields, then confirms success", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    fillRequired();
    await submit();
    const [url, options] = fetchMock.mock.calls[0];
    const body = new URLSearchParams(options.body);
    expect(url).toBe("/");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe(
      "application/x-www-form-urlencoded",
    );
    expect(body.get("form-name")).toBe("contracting-inquiry");
    expect(body.get("name")).toBe("Test Investor");
    expect(body.get("propertyCounty")).toBe("Alachua");
    expect(body.get("projectStage")).toBe("Land under contract");
    expect(body.get("source")).toBe("qr");
    expect(body.get("utm_source")).toBe("facebook");
    expect(body.get("utm_campaign")).toBe("land-home");
    expect(container.querySelector('[role="status"]')?.textContent).toContain(
      "has been sent",
    );
    expect(
      container.querySelector<HTMLInputElement>('[name="email"]')!.value,
    ).toBe("");
  });

  it("retains project details and allows retry after a rejected HTTP response", async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });
    fillRequired();
    await submit();
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "couldn't send",
    );
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(
      container.querySelector<HTMLInputElement>('[name="email"]')!.value,
    ).toBe("test@example.com");
    expect(container.querySelector("fieldset")!.disabled).toBe(false);
    await submit();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("rejects whitespace-only required fields without making a request", async () => {
    fillRequired();
    container.querySelector<HTMLInputElement>('[name="name"]')!.value = "   ";
    await submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Please enter",
    );
  });

  it("shows an error for network failures and re-enables the form", async () => {
    fetchMock.mockRejectedValue(new Error("Network unavailable"));
    fillRequired();
    await submit();
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.querySelector("fieldset")!.disabled).toBe(false);
  });
});
