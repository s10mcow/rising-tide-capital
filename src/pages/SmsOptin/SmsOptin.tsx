import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
export default function SmsOptin() {
  return (
    <Layout>
      <section className="utility-page">
        <div className="utility-content">
          <p className="eyebrow">STAY IN TOUCH</p>
          <h1>SMS updates.</h1>
          <p>
            Receive text messages from Rising Tide Capital Partners about
            property purchase inquiries and follow-up conversations.
          </p>
          <div className="sms-panel">
            <span className="eyebrow">SIGN UP FROM YOUR PHONE</span>
            <h2>
              Text START to
              <br />
              (904) 906-9630.
            </h2>
            <p>
              Send the message from the phone number where you want to receive
              updates.
            </p>
            <a className="site-button dark" href="sms:+19049069630?body=START">
              Open your messaging app ↗
            </a>
            <p className="form-note">
              Opening your messaging app does not sign you up. Send START to
              request text updates.
            </p>
          </div>
          <p className="sms-disclosure">
            By texting START, you consent to receive recurring text messages
            from Rising Tide Capital Partners LLC regarding property purchase
            inquiries. Consent is not a condition of purchase. Message frequency
            varies. Message and data rates may apply. Reply STOP to opt out at
            any time or HELP for help.
          </p>
          <p className="utility-links">
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
          </p>
          <hr />
          <h2>Need a hand?</h2>
          <p>
            Email{" "}
            <a className="text-link" href="mailto:hello@risingtidecapital.us">
              hello@risingtidecapital.us
            </a>{" "}
            or reply HELP to a message.
          </p>
        </div>
      </section>
    </Layout>
  );
}
