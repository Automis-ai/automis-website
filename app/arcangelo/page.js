import { redirect } from "next/navigation";

// Former IG-bio slug. The canonical landing now lives at /playbook; keep this as
// a permanent redirect so any stray /arcangelo links still resolve.
export default function Page() {
  redirect("/playbook");
}
