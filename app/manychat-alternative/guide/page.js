import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession, cookieName } from "@/lib/guideGate";
import S from "./snippets";
import GuideArticle from "@/components/guides/GuideArticle";
import { Code, Part, Step, Check as BaseCheck } from "@/components/guides/guideBlocks";

const T = {
  ...{
  "authorKey": "arcangelo",
  "avatar": "/manychat-alternative/arcangelo.jpg",
  "category": "Technical guide",
  "updated": "Updated 29 October 2026",
  "steps": "14 steps",
  "title": "The comment-to-DM flow on Instagram, step by step",
  "lead": "Someone comments a word under your post and gets a private message with your resource. Here is every step to build it yourself with Meta's official APIs: the app, the receiver, the flow, the full code, and the tests to run before you switch it on.",
  "pdfTitle": "Download the guide as a PDF",
  "pdfSub": "The same guide, to keep and to print",
  "noteTitle": "Bookmark this page.",
  "note": "You stay in for 30 days on this device; after that, just enter your email again.",
  "tocLabel": "Contents",
  "ctaTitle": "Stuck on a step? I'll help you build it.",
  "ctaText": "If the app, the receiver or the tests don't add up, book a 15-minute call and we'll look at it together.",
  "ctaButton": "Book a 15-minute call"
},
  pdf: "/api/guide-pdf?lang=en",
  call: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
  toc: [
  {
    "level": 2,
    "id": "part-a",
    "text": "Part A · The Meta app"
  },
  {
    "level": 2,
    "id": "part-b",
    "text": "Part B · The receiver"
  },
  {
    "level": 2,
    "id": "part-c",
    "text": "Part C · The flow, call by call"
  },
  {
    "level": 2,
    "id": "part-d",
    "text": "Part D · The full code"
  },
  {
    "level": 2,
    "id": "part-e",
    "text": "Part E · The tests, before you switch it on"
  },
  {
    "level": 2,
    "id": "if-it-doesnt-work",
    "text": "If it doesn't work"
  },
  {
    "level": 2,
    "id": "part-f",
    "text": "Part F · Rules, limits and production"
  },
  {
    "level": 2,
    "id": "honesty",
    "text": "Honesty, what this guide doesn't say"
  }
],
};
const Check = (props) => <BaseCheck label="Check" {...props} />;

function GuideContent() {
  return (
    <GuideArticle locale="en" t={T}>
        <div className="g-flow">
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

        <div className="g-grid2">
          <div className="g-panel">
            <h3>What you need</h3>
            <ul>
              <li>An Instagram <b>professional</b> account (Business or Creator).</li>
              <li>A <b>second</b> Instagram account, only for testing.</li>
              <li>An account on <b>developers.facebook.com</b>.</li>
              <li><b>Node.js 18</b> or later. The code is JavaScript; the logic works in any language.</li>
              <li>A public <b>https address</b> for the receiver: a tunnel is enough for testing (ngrok, Cloudflare Tunnel or similar), an always-on service for production.</li>
            </ul>
          </div>
          <div className="g-panel">
            <h3>How to read it</h3>
            <ul>
              <li>Every step has a <b>Check</b> line: it tells you how to know it worked before moving on.</li>
              <li>Menu names in Meta's dashboard change often: if you can't find an item, search for its English name in the app settings.</li>
              <li>Calls contain <b>&lt;PLACEHOLDERS&gt;</b> to replace. The token and the App Secret are secrets: never put them in published code.</li>
            </ul>
          </div>
        </div>

        <Part id="part-a">Part A · The Meta app</Part>

        <Step n="1" title="Create the app">
          <p>Go to <b>developers.facebook.com</b>, log in and choose <b>My Apps → Create App</b>. As the use case pick the one for managing messages and content on Instagram and, if asked, the <b>Business</b> type. An app that isn't a Business app won't work: if you have an old one, create a new one.</p>
          <Check>you see the app dashboard, with <b>Instagram</b> in the left menu.</Check>
        </Step>

        <Step n="2" title="Open the Instagram setup">
          <p>In the left menu: <b>Instagram → API setup with Instagram business login</b>. Meta also calls it <i>Instagram API with Instagram Login</i>: it's the simplest route and doesn't require a Facebook Page. Accounts, tokens and webhooks all live here.</p>
        </Step>

        <Step n="3" title="Check the permissions">
          <p>You need three:</p>
          <Code>{S.perms}</Code>
          <p>For your own account, and for anyone with a role on the app, <b>no Meta review is needed</b>: Standard access is enough. Review is only required if you use the app for other people's accounts.</p>
        </Step>

        <Step n="4" title="Generate the token and get the IDs">
          <p>On the same page, next to your account, click <b>Generate token</b>, log in to Instagram and copy the token: it lasts <b>60 days</b>. Then go to <b>App settings → Basic</b> and copy the <b>App Secret</b> (click Show). Finally ask Meta for your account ID:</p>
          <Code>{S.me}</Code>
          <Check>the response contains your username and a <b>user_id</b>: that is your <b>IG_ID</b>, the same one you'll see as <b>id</b> in webhook notifications. Write down three values: <b>TOKEN</b>, <b>APP_SECRET</b>, <b>IG_ID</b>.</Check>
        </Step>

        <Step n="5" title="Add the second account as a tester">
          <p>In the dashboard: <b>App roles → Roles → Add people → Instagram Tester</b>, and enter the second account's username. Then, <b>from the second account</b>, in Instagram: <b>Settings → Apps and websites → Tester invites</b> and accept.</p>
          <p><b>Why it matters:</b> with Standard access the app only sees people who have a role on the app. Without this step the second account's comments never arrive, and you'll think everything else is wrong.</p>
          <Check>in the dashboard the second account shows up among the testers, invite accepted.</Check>
        </Step>

        <Part id="part-b">Part B · The receiver</Part>

        <Step n="6" title="Put the receiver online">
          <p>The code is in part D. Start it and make it reachable from a public <b>https</b> address: a tunnel to port 3000 for testing, an always-on service in production. The variables to set are at the end of part D.</p>
          <Check>opening the address in a browser, the server answers (even just "no"): it means it's reachable.</Check>
        </Step>

        <Step n="7" title="Register the webhook">
          <p>On the page from step 2 find <b>Configure webhooks</b> and fill in:</p>
          <ul>
            <li><b>Callback URL</b>: the receiver's https address.</li>
            <li><b>Verify token</b>: a string of your choice, the same one you set in <b>VERIFY_TOKEN</b>.</li>
          </ul>
          <p>Click <b>Verify and save</b>. Meta sends a GET request to your address with <b>hub.mode</b>, <b>hub.verify_token</b> and <b>hub.challenge</b>: the server must answer with the value of <b>hub.challenge</b>. The code already does it.</p>
          <Check>the dashboard saves without errors.</Check>
        </Step>

        <Step n="8" title="Subscribe your account to the events">
          <Code>{S.subscribe}</Code>
          <p>In the dashboard, in the same webhooks section, also turn on the <b>comments</b>, <b>messages</b> and <b>messaging_postbacks</b> fields.</p>
          <Check>the response is <code>{'{"success": true}'}</code>. With <code>GET .../me/subscribed_apps</code> you see the subscribed fields.</Check>
        </Step>

        <div className="g-panel g-gold">
          <h3>The 4 receiver rules, according to Meta</h3>
          <ul>
            <li>Answer <b>200 right away</b> to every notification, then do the work. If you don't, Meta retries for <b>36 hours</b>.</li>
            <li><b>Drop duplicates</b>: because of retries the same notification can arrive more than once.</li>
            <li><b>Verify the signature</b>: the <b>X-Hub-Signature-256</b> header is an HMAC SHA256 of the <b>raw</b> body, computed with the App Secret. If it doesn't match, discard.</li>
            <li>Notifications arrive <b>in batches</b> (up to 1000): loop over every item, don't just read the first.</li>
          </ul>
        </div>

        <Part id="part-c">Part C · The flow, call by call</Part>

        <Step n="9" title="The comment arrives">
          <p>Meta sends the receiver a <b>comments</b> notification. You need four values: the <b>comment id</b>, the <b>commenter's id</b>, the <b>text</b> and the <b>post id</b>.</p>
          <Code>{S.comment}</Code>
          <p>Check whether the text contains your keyword (whole word, case-insensitive) and handle <b>only each person's first comment</b> on that post.</p>
        </Step>

        <Step n="10" title="Public reply, under the comment">
          <Code>{S.replies}</Code>
          <p>It only works on top-level comments. Rotate 3 to 5 variants.</p>
        </Step>

        <Step n="11" title="Private reply: the first message">
          <p>You send it with the <b>comment id</b> in place of the person's id. Meta allows <b>only one per comment</b>, within <b>7 days</b>. It lands in the inbox if the person follows you, in the <b>Requests</b> folder if they don't, with a link to the post.</p>
          <p><b>Try 1 · with the button</b> (this is what you want: the tap opens the 24 hours):</p>
          <Code>{S.try1}</Code>
          <div className="g-warn">
            <b>To be tested, not guaranteed.</b> In Meta's documentation the private reply is described only with plain text, and the button only with the person's id in place of the comment id. Nowhere does it say they can be combined. The code in part D tries the button and, if Meta rejects it, falls back to try 2 on its own.
          </div>
          <p><b>Try 2 · text only, and the person replies</b> (always works):</p>
          <Code>{S.try2}</Code>
          <p>When the person replies, the receiver gets a <b>messages</b> notification and the 24 hours are open, just like with the tap.</p>
          <Check>from the second account the message arrives (check <b>Requests</b> too). Note which try worked: it's the most important piece of information in this whole guide.</Check>
        </Step>

        <Step n="12" title="The button tap">
          <p>When the person taps, a <b>messaging_postbacks</b> notification arrives. From it you get their <b>id</b> (<b>sender.id</b>) and <b>24 hours</b> to write.</p>
          <Code>{S.postback}</Code>
          <p>The <b>payload</b> is the string you chose: here it tells you which keyword they're waiting on.</p>
        </Step>

        <Step n="13" title="The follow">
          <p>Before the link, ask them to follow you and check whether they do. The check is a call on the person's id:</p>
          <Code>{S.follow}</Code>
          <p>It only works after the person has tapped a button or replied. The way I recommend is <b>soft</b>: if they don't follow you, send the message with the request and a second button; <b>on the second tap the link goes out anyway</b>. The check is sometimes wrong for long-time followers, and blocking a real follower costs more than a link given away.</p>
        </Step>

        <Step n="14" title="The link and the question">
          <Code>{S.link}</Code>
          <p>The link starts with <b>https</b>. The question is a single one, answerable in one line: it's what starts the conversation.</p>
          <Check>from the second account: comment, public reply, message, tap, follow request, second tap, link. If the whole chain comes back, the flow works.</Check>
        </Step>

        <Part id="part-d">Part D · The full code</Part>
        <p>
          One file, <b>bot.mjs</b>, no libraries to install. It does the whole chain: verification, signature, duplicates, public reply, try 1 and try 2, soft follow, link. The rules (one row per keyword) are at the top: swap in your own.
        </p>
        <Code tall>{S.bot}</Code>
        <p><b>How to start it</b></p>
        <Code>{S.env}</Code>
        <div className="g-panel">
          <ul>
            <li><b>What has been verified:</b> the logic (signature, duplicates, whole-word match, the sequence of steps, the fallback when the button is rejected) is tested against a fake Meta server, 17 checks out of 17. <b>It has not been tested against Meta:</b> you do that with part E.</li>
            <li><b>Limits of this file:</b> duplicates and who has already been asked to follow are kept in memory, and are lost on restart. For real use, store them in a file or a database.</li>
          </ul>
        </div>

        <Part id="part-e">Part E · The tests, before you switch it on</Part>
        <div className="g-panel">
          <ol>
            <li>Publish (or use) a test post on your account and write the keyword in the caption.</li>
            <li>From the <b>second account</b> comment with the keyword. Then watch the receiver's logs.</li>
            <li>Check: public reply under the comment, private message (also in <b>Requests</b>), tap or reply, follow request, second tap, link.</li>
            <li>Note <b>which try</b> from step 11 worked (button or text only) and adjust your texts accordingly.</li>
            <li>Open the link <b>from your phone</b>: it must start with https and load.</li>
            <li>Comment twice from the same account: the second time nothing should happen.</li>
            <li>The keyword stays <b>off</b> (<code>active: false</code>) until the day you publish.</li>
          </ol>
        </div>

        <Part id="if-it-doesnt-work">If it doesn't work</Part>
        <div className="blog-table-wrap">
          <table>
            <thead>
              <tr><th>What you see</th><th>What to check</th></tr>
            </thead>
            <tbody>
              <tr><td>The dashboard won't save the webhook</td><td>The address isn't a public https one, the server doesn't answer with <b>hub.challenge</b>, or the <b>Verify token</b> differs from VERIFY_TOKEN.</td></tr>
              <tr><td>The webhook is saved, but nothing arrives</td><td>Account not subscribed (step 8), fields not turned on, the commenter <b>isn't a tester</b> (step 5), account isn't professional, comment on someone else's post.</td></tr>
              <tr><td>It arrives, but the bot answers 401</td><td>The signature. It must be computed on the <b>raw</b> body, not on re-serialized JSON, and with the App Secret of <b>this</b> app.</td></tr>
              <tr><td>Error on the private reply</td><td>Comment older than 7 days, a message already sent for that comment, expired token or missing permission. Read the error code in Meta's response.</td></tr>
              <tr><td>The button is rejected</td><td>That's the try 2 case: the code falls back to text. Look for the "button rejected" message in the logs.</td></tr>
              <tr><td>You can't see the message</td><td>Look in the <b>Requests</b> folder: if the second account doesn't follow you, it lands there.</td></tr>
              <tr><td>Duplicate messages</td><td>Deduplication is missing. Meta retries if your answer is slow: answer 200 before working.</td></tr>
              <tr><td>It stops after a few weeks</td><td>The token lasts 60 days. Renew it before it expires (part F).</td></tr>
            </tbody>
          </table>
        </div>

        <Part id="part-f">Part F · Rules, limits and production</Part>
        <div className="g-grid2">
          <div className="g-panel">
            <h3>Meta's limits</h3>
            <ul>
              <li>One automated message per comment, within 7 days.</li>
              <li>To write again you need a reply or a tap: from then you have 24 hours.</li>
              <li>Up to <b>750 private replies per hour</b> per account, on comments to posts and reels.</li>
              <li>The message can't go out if the comment is hidden, or belongs to a live that has ended.</li>
              <li>You can only reply publicly to top-level comments.</li>
            </ul>
          </div>
          <div className="g-panel">
            <h3>Good habits</h3>
            <ul>
              <li><b>Say it's automated</b> in the first message. Meta requires it where the law does and recommends it everywhere.</li>
              <li>One rule per keyword, and the same keyword in the video and in the caption.</li>
              <li>Store only what you need (id, keyword, outcome) and say in your privacy notice what you keep.</li>
              <li>No messages to people who haven't written to you.</li>
            </ul>
          </div>
        </div>
        <div className="g-panel">
          <h3>To keep it running for real</h3>
          <ol>
            <li><b>An always-on service</b> for the receiver, with automatic restart if it crashes.</li>
            <li><b>A store</b> instead of memory: comments already handled and who has been asked to follow.</li>
            <li>
              <b>Renew the token</b> before the 60 days are up (it must be at least 24 hours old and not expired; after renewal it's valid for another 60 days):
              <Code>{S.refresh}</Code>
            </li>
            <li><b>A log</b> of who asked for what and whether the link arrived: it tells you which video brings in contacts.</li>
            <li>If you want to use it for <b>other people's accounts</b> (clients), you need Meta's review: it's a separate job, with videos and permissions one by one.</li>
          </ol>
        </div>

        <Part id="honesty">Honesty, what this guide doesn't say</Part>
        <div className="g-panel">
          <ul>
            <li><b>Meta's rules and APIs change.</b> The steps were checked against the official documentation on 29 Oct 2026 (pages updated between March and June 2026): re-check before you build.</li>
            <li><b>The button inside the private reply is not documented by Meta.</b> That's why there are two tries. I can't tell you in advance which one will work on your account.</li>
            <li><b>Menu names</b> in Meta's dashboard change: the ones given are my reading of the documentation, not a screenshot from today.</li>
            <li><b>The follow:</b> asking people to follow before the resource isn't forbidden, but Meta doesn't expressly endorse it. Your call.</li>
            <li><b>Regulated sectors</b>, like healthcare: Meta restricts using messaging to connect people with healthcare providers. Read its policies first.</li>
            <li>It covers <b>one path only</b>, from comment to resource. Longer flows or sends to a list aren't here.</li>
          </ul>
        </div>

    </GuideArticle>
  );
}

// Cancello: si entra solo con il cookie messo da /api/guide-access, cioè dopo aver cliccato il link
// nella mail di conferma. Senza cookie valido si torna alla pagina pubblica.
export default function Page() {
  if (!verifySession(cookies().get(cookieName("en"))?.value, "en")) redirect("/manychat-alternative");
  return <GuideContent />;
}
