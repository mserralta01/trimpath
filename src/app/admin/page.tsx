import { AdminDashboard } from "@/components/admin-dashboard";
import Link from "next/link";

export default function AdminPage() {
  const localPreview = process.env.NODE_ENV !== "production";
  if (!localPreview) {
    return <main className="admin-locked"><div><span>AXISPEP OPERATIONS</span><h1>Back office is safely locked.</h1><p>The complete admin workspace is deployed, but it will remain inaccessible until the required Keycloak client and <code>app_axispep</code> role are connected.</p><Link href="/">Return to storefront</Link></div></main>;
  }
  return <AdminDashboard />;
}
