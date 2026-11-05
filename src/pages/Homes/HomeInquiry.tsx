import { submitContact } from "@/lib/submit-contact";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

export default function HomeInquiry({ regarding }: { regarding?: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    if (regarding) {
      const message = String(data.get("message") ?? "").trim();
      data.set(
        "message",
        message
          ? `Asking about: ${regarding}\n\n${message}`
          : `Asking about: ${regarding}`,
      );
    }
    try {
      await submitContact(data);
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We couldn’t send your message. Please try again.",
      );
      setStatus("error");
      return;
    } finally {
      sending.current = false;
    }
    try {
      window.gtag?.("event", "form_submit", {
        form_name: "contact",
        source: "homes-for-sale",
      });
    } catch {
      /* Analytics is optional. */
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="contact-success">
        <h3>Message received.</h3>
        <p>Thank you for getting in touch. Our team will follow up with you.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Leave empty
          <input name="bot-field" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      <fieldset disabled={status === "sending"} className="contact-fields">
        <legend className="visually-hidden">Your contact details</legend>
        {regarding ? (
          <p className="form-note">Asking about: {regarding}</p>
        ) : null}
        <div className="contact-field-grid">
          <label>
            Name
            <input name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label className="wide">
            Phone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              maxLength={40}
            />
          </label>
          <label className="wide">
            Message
            <textarea
              name="message"
              rows={4}
              required
              maxLength={5000}
              placeholder="Tell us what you’re looking for."
            />
          </label>
        </div>
        <p className="form-note">
          We’ll use your details to respond to this inquiry.{" "}
          <a href="/privacy">Privacy policy</a>.
        </p>
        <button type="submit" className="site-button dark">
          {status === "sending" ? "Sending…" : "Send your message ↗"}
        </button>
      </fieldset>
      {status === "error" ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
