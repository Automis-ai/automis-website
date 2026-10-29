import SignupForm from "@/components/guides/SignupForm";
import { mont, open, css } from "@/components/guides/manychatShared";

const CALL = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

// Public page (indexable): presents the guide and collects the email.
// The actual guide lives in /guide and opens only with the code issued after the email.
export default function ManyChatAlternative({ searchParams }) {
  return (
    <main id="guida" className={`${mont.variable} ${open.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="wrap">
        <div className="top">
          <img src="/luca-ig/automis-logo.png" alt="Automis" />
          <span className="pill">AI Agency</span>
        </div>

        <div className="hero">
          <img src="/manychat-alternative/arcangelo.jpg" alt="Arcangelo" />
          <div>
            <p className="kicker">ManyChat alternative · technical guide</p>
            <h1>
              ManyChat alternative: the Instagram comment-to-DM flow, <em>built by you</em>
            </h1>
            <p className="lead">
              Someone comments a word under your post and gets a private message with your resource. ManyChat charges by active contacts (as of 27 Oct 2026, from $17 to $199 a month). This guide shows how to build the same path with Meta's official APIs.
            </p>
          </div>
        </div>

        <div className="flow">
          <span>Comment with the keyword</span>
          <i>→</i>
          <span>Public reply</span>
          <i>→</i>
          <span>Message with a button</span>
          <i>→</i>
          <span>Follow</span>
          <i>→</i>
          <span>Link and question</span>
        </div>

        <SignupForm lang="en" expired={searchParams?.expired === "1"} />

        <div className="grid2">
          <div className="panel">
            <h3>What's in the guide</h3>
            <ul className="dots">
              <li><b>The Meta app:</b> 5 steps, from the app to permissions, from the token to the test account.</li>
              <li><b>The receiver:</b> the address Meta calls on every comment.</li>
              <li><b>The flow:</b> the calls, one by one, down to the link.</li>
              <li><b>The full code:</b> a single file, tested against a fake Meta server.</li>
              <li><b>The tests:</b> what to check and what to do if it doesn't work.</li>
              <li><b>Rules and production:</b> Meta's limits, policies, token renewal.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>What you need</h3>
            <ul className="dots">
              <li>An Instagram <b>professional</b> account (Business or Creator).</li>
              <li>A <b>second</b> Instagram account, only for testing.</li>
              <li>An account on <b>developers.facebook.com</b>.</li>
              <li><b>Node.js 18</b> or later. The logic works in any language.</li>
              <li>A public <b>https address</b> for the receiver.</li>
            </ul>
          </div>
        </div>

        <div className="honest" style={{ marginTop: 0 }}>
          <h3>Honesty, what this guide doesn't say</h3>
          <ul>
            <li><b>Meta's rules and APIs change.</b> The steps were checked against the official documentation on 29 Oct 2026: re-check before you build.</li>
            <li><b>The button inside the private reply is not documented by Meta.</b> That's why the guide gives two tries: I can't tell you in advance which one will work on your account.</li>
            <li>It covers <b>one path only</b>, from comment to resource. Longer flows or sends to a list aren't included.</li>
          </ul>
        </div>

        <div className="cta">
          <h3>Rather look at it together?</h3>
          <p>If the app, the receiver or the tests don't add up, book a 15-minute call.</p>
          <a href={CALL} target="_blank" rel="noopener">Book a 15-minute call</a>
        </div>

        <footer className="foot">
          <strong style={{ color: "#fff", fontFamily: "var(--head)" }}>Automis</strong> · AI Agency
          <br />
          <a href="https://automis.ai" target="_blank" rel="noopener">automis.ai</a>
        </footer>
      </div>
    </main>
  );
}
