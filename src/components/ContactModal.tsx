import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { submitContact } from "@/lib/submit-contact";

export default function ContactModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const close = () => {
    if (sending.current) return;
    handleClose();
    setStatus("idle");
    setError("");
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    try {
      await submitContact(new FormData(form));
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
        source: "modal",
      });
    } catch {
      /* Analytics is optional. */
    }
  }
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullWidth
      maxWidth="sm"
      aria-labelledby="contact-dialog-title"
      PaperProps={{ className: "contact-dialog" }}
    >
      <DialogTitle id="contact-dialog-title">
        <span className="eyebrow">LET’S START A CONVERSATION</span>Tell us about
        your property.
      </DialogTitle>
      <DialogContent>
        {status === "success" ? (
          <div role="status" className="contact-success">
            <h3>Message received.</h3>
            <p>
              Thank you for getting in touch. Our team will follow up with you.
            </p>
            <button className="site-button dark" onClick={close}>
              Close
            </button>
          </div>
        ) : (
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
            <fieldset
              disabled={status === "sending"}
              className="contact-fields"
            >
              <legend className="visually-hidden">Your contact details</legend>
              <div className="contact-field-grid">
                <label>
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                  />
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
                  Property details or message
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={5000}
                    placeholder="Location, parcel ID, or what you’re considering…"
                  />
                </label>
              </div>
              <p className="form-note">
                We’ll use your details to respond to this inquiry.{" "}
                <a href="/privacy">Privacy policy</a>.
              </p>
              <div className="site-actions">
                <button type="submit" className="site-button dark">
                  {status === "sending" ? "Sending…" : "Send your message ↗"}
                </button>
                <button type="button" className="text-link" onClick={close}>
                  Cancel
                </button>
              </div>
            </fieldset>
            {status === "error" ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
