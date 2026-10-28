import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CONTRACTING_FORM_NAME,
  submitContractingInquiry,
} from "./submit-inquiry";

export default function ContractingInquiry() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("sending");
    setError("");
    const form = event.currentTarget;

    try {
      await submitContractingInquiry(new FormData(form));
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We couldn't send your inquiry. Please try again or call us.",
      );
      setStatus("error");
      return;
    } finally {
      submitting.current = false;
    }

    // A blocked analytics script must not turn a successful inquiry into an error.
    try {
      window.gtag?.("event", "generate_lead", {
        form_name: CONTRACTING_FORM_NAME,
      });
    } catch {
      // The inquiry was already accepted; analytics is optional.
    }
  }

  return (
    <div className="contracting-inquiry">
      <h3>Tell us what you’re planning.</h3>
      <p className="contracting-form-intro">
        Start with the basics. We’ll follow up to discuss your property and
        scope.
      </p>
      <form
        name={CONTRACTING_FORM_NAME}
        method="POST"
        onSubmit={handleSubmit}
        aria-busy={status === "sending"}
      >
        <input type="hidden" name="form-name" value={CONTRACTING_FORM_NAME} />
        <div hidden>
          <label>
            Leave this field empty
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {["source", "utm_source", "utm_medium", "utm_campaign"].map((name) => (
          <input
            key={name}
            type="hidden"
            name={name}
            value={
              searchParams.get(name) ||
              (name === "source" ? "contracting-page" : "")
            }
          />
        ))}
        <fieldset disabled={status === "sending"}>
          <legend className="contracting-sr-only">
            Your contact and project details
          </legend>
          <div className="contracting-form-grid">
            <label htmlFor="contracting-name">
              Name <span aria-hidden="true">*</span>
              <input
                id="contracting-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="contracting-email">
              Email <span aria-hidden="true">*</span>
              <input
                id="contracting-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label htmlFor="contracting-phone">
              Phone <span className="contracting-optional">(optional)</span>
              <input
                id="contracting-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
            <label htmlFor="contracting-county">
              Florida county <span aria-hidden="true">*</span>
              <input
                id="contracting-county"
                name="propertyCounty"
                maxLength={80}
                required
              />
            </label>
            <label
              className="contracting-field-wide"
              htmlFor="contracting-property"
            >
              Property address or parcel ID{" "}
              <span className="contracting-optional">(optional)</span>
              <input
                id="contracting-property"
                name="propertyAddress"
                maxLength={250}
              />
            </label>
            <label htmlFor="contracting-stage">
              Project stage <span aria-hidden="true">*</span>
              <select
                id="contracting-stage"
                name="projectStage"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your stage
                </option>
                <option>Researching or looking for land</option>
                <option>Land under contract</option>
                <option>Own land, sourcing a home</option>
                <option>Home selected, ready to plan</option>
                <option>Project already underway</option>
              </select>
            </label>
            <label htmlFor="contracting-use">
              Planned use{" "}
              <span className="contracting-optional">(optional)</span>
              <select id="contracting-use" name="plannedUse" defaultValue="">
                <option value="">Select planned use</option>
                <option>Resale</option>
                <option>Rental</option>
                <option>Personal residence</option>
                <option>Still deciding</option>
              </select>
            </label>
            <label
              className="contracting-field-wide"
              htmlFor="contracting-message"
            >
              Anything else we should know?{" "}
              <span className="contracting-optional">(optional)</span>
              <textarea
                id="contracting-message"
                name="message"
                rows={3}
                maxLength={5000}
                placeholder="Home selected, site conditions, target timing…"
              />
            </label>
          </div>
          <p className="contracting-form-note">
            * Required. We’ll use these details to respond to your inquiry.{" "}
            <Link to="/privacy">Privacy policy</Link>.
          </p>
          <button className="contracting-button" type="submit">
            {status === "sending"
              ? "Sending your inquiry…"
              : "Discuss my project"}
            <span aria-hidden="true">↗</span>
          </button>
        </fieldset>
        <div aria-live="polite" aria-atomic="true">
          {status === "success" ? (
            <p className="contracting-form-success" role="status">
              Thank you. Your project inquiry has been sent. We’ll be in touch
              to discuss the next steps.
            </p>
          ) : null}
        </div>
        {status === "error" ? (
          <p className="contracting-form-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
