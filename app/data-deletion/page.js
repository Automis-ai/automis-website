"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AkpagerLayout from "@/layouts/AkpagerLayout";

const STATUS_URL =
  "https://ttynesssfwybbagqjbgp.supabase.co/functions/v1/meta-data-deletion";
const CODE_RE = /^[a-f0-9]{32}$/;
const CARD =
  "bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300";
const LINK = "text-blue-middle hover:text-yellow-light transition-all duration-300";

const formatDate = (iso) => {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

const Bullet = ({ children }) => (
  <li className="flex items-start">
    <span className="mr-3 mt-1">•</span>
    <span>{children}</span>
  </li>
);

const Step = ({ n, children }) => (
  <li className="flex items-start">
    <span className="mr-3 font-semibold">{n}.</span>
    <span>{children}</span>
  </li>
);

const StatusCard = ({ code }) => {
  const valid = CODE_RE.test(code);
  const [state, setState] = useState(valid ? { kind: "loading" } : { kind: "invalid" });

  useEffect(() => {
    if (!valid) {
      setState({ kind: "invalid" });
      return;
    }
    const ctrl = new AbortController();
    setState({ kind: "loading" });
    fetch(`${STATUS_URL}?code=${encodeURIComponent(code)}`, { signal: ctrl.signal })
      .then(async (res) => {
        if (res.status === 404) return setState({ kind: "notfound" });
        if (res.status === 400) return setState({ kind: "invalid" });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        setState(
          data.status === "completed"
            ? { kind: "completed", date: formatDate(data.completed_at) }
            : { kind: "received", date: formatDate(data.created_at) }
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ kind: "error" });
      });
    return () => ctrl.abort();
  }, [code, valid]);

  let title;
  let body;
  switch (state.kind) {
    case "loading":
      title = "Checking your request";
      body = "One moment while we look up your confirmation code.";
      break;
    case "received":
      title = "Received";
      body = `We got your request${state.date ? ` on ${state.date}` : ""} and are deleting your data.`;
      break;
    case "completed":
      title = "Completed";
      body = `Your data has been deleted${state.date ? ` on ${state.date}` : ""}.`;
      break;
    case "notfound":
      title = "Code not found";
      body = "Check the code and try again, or contact support@automis.ai.";
      break;
    case "invalid":
      title = "Invalid code";
      body = "This code is not valid. Check that you copied the whole code, or contact support@automis.ai.";
      break;
    default:
      title = "Something went wrong";
      body = "We could not check this request right now. Try again later or contact support@automis.ai.";
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="section-heading text-white mb-6">Request status</h2>
      <div className={CARD} role="status" aria-live="polite">
        <h3 className="card-heading text-white mb-4">{title}</h3>
        <p className="body-text text-white/90 mb-4">{body}</p>
        <p className="body-text text-white/70 break-all">Confirmation code: {code}</p>
      </div>
      <p className="body-text text-white/70 mt-6">
        <Link href="/data-deletion" className={LINK}>
          Back to deletion instructions
        </Link>
      </p>
    </div>
  );
};

const Instructions = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-12">
      <div className={CARD}>
        <p className="body-text text-white/90">
          Automis helps businesses answer comments and messages on their Facebook Pages and Instagram accounts. If you ever commented on or messaged such an account, we may hold: your Meta user ID and username, the text of your comment, the messages in the automated chat, and whether you follow the account.
        </p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">Option 1: through Facebook or Instagram (automatic)</h2>
      <div className={CARD}>
        <ol className="body-text text-white/90 space-y-3">
          <Step n={1}>Open Facebook, go to Settings and privacy, then Settings, then Apps and websites.</Step>
          <Step n={2}>Find "Automis Social" and choose Remove.</Step>
          <Step n={3}>Choose the option to also send Automis a data deletion request.</Step>
          <Step n={4}>Meta sends us the request. We delete the data linked to your Meta ID and show you a confirmation code.</Step>
        </ol>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">Option 2: by email</h2>
      <div className={CARD}>
        <p className="body-text text-white/90 mb-4">
          Email{" "}
          <a href="mailto:support@automis.ai?subject=Delete%20my%20data" className={LINK}>
            support@automis.ai
          </a>{" "}
          from any address with the subject "Delete my data" and tell us:
        </p>
        <ul className="body-text text-white/90 space-y-2 mb-4">
          <Bullet>your Instagram username or Facebook profile name,</Bullet>
          <Bullet>the business Page or account you interacted with (if you remember).</Bullet>
        </ul>
        <p className="body-text text-white/90">
          We may ask for one extra detail to confirm it is you (for example, a message sent from that profile). We never ask for your password. We reply within 30 days and confirm when deletion is complete.
        </p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">Check the status of a request</h2>
      <div className={CARD}>
        <p className="body-text text-white/90 mb-4">
          If you have a confirmation code, open this page with <span className="font-semibold">?code=YOUR_CODE</span> at the end of the address. You will see one of:
        </p>
        <ul className="body-text text-white/90 space-y-2 mb-4">
          <Bullet><span className="font-semibold">Received:</span> we got your request and are deleting your data.</Bullet>
          <Bullet><span className="font-semibold">Completed:</span> your data has been deleted, with the date.</Bullet>
          <Bullet><span className="font-semibold">Code not found:</span> check the code or contact support@automis.ai.</Bullet>
        </ul>
        <p className="body-text text-white/90">
          The page shows only status and dates. It never shows personal data.
        </p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">What we delete and what we may keep</h2>
      <div className={CARD}>
        <ul className="body-text text-white/90 space-y-3 mb-4">
          <Bullet><span className="font-semibold">Deleted:</span> comments, message content, username and ID tied to you in our activity logs.</Bullet>
          <Bullet><span className="font-semibold">May be kept:</span> records we must keep by law, and aggregate numbers that no longer identify you.</Bullet>
        </ul>
        <p className="body-text text-white/90">
          The business that owns the Page may hold its own copy as controller. Ask them directly, or tell us and we pass your request on.
        </p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">Businesses (clients)</h2>
      <div className={CARD}>
        <p className="body-text text-white/90">
          To disconnect a Page or account and remove all its stored data, use Disconnect in your dashboard, or email support@automis.ai. The access key is deleted immediately and workspace data within 60 days at most.
        </p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="section-heading text-white mb-6">Related</h2>
      <div className={CARD}>
        <p className="body-text text-white/90 mb-2">
          <span className="font-semibold">Privacy Policy:</span>{" "}
          <Link href="/privacy-policy" className={LINK}>
            https://automis.ai/privacy-policy
          </Link>
        </p>
        <p className="body-text text-white/90">
          <span className="font-semibold">Controller details:</span> Automis AI OÜ, Järvevana tee 9, 11314 Tallinn, Estonia.
        </p>
      </div>
    </div>
  </div>
);

const Content = () => {
  const params = useSearchParams();
  const code = params.get("code");
  return code !== null ? <StatusCard code={code} /> : <Instructions />;
};

const DataDeletion = () => (
  <AkpagerLayout header={6} footer={1} bodyClass="home-nine" onePage={false}>
    <section className="hero-padding bg-bg-primary relative z-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-20">
          <div className="text-center mb-12">
            <h1 className="hero-heading text-white mb-4">Delete your data from the Automis app</h1>
            <p className="sub-heading text-white/90 mb-2">Automis</p>
          </div>
          <Suspense fallback={null}>
            <Content />
          </Suspense>
        </div>
      </div>
    </section>
  </AkpagerLayout>
);

export default DataDeletion;
