import { ChevronDown } from "lucide-react";
import { Logo } from "./Sidebar.jsx";

export default function Topbar({ page }) {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <Logo />
      </div>
      <nav className="crumbs" aria-label="Breadcrumb">
        <span>Workspace</span>
        <span aria-hidden="true">/</span>
        <strong aria-current="page">
          {page === "tasks" ? "My tasks" : "Overview"}
        </strong>
      </nav>
      <div className="user">
        <span className="avatar-jd" aria-hidden="true">
          JD
        </span>
        <span className="sr-only">Signed in as JD</span>
        <ChevronDown size={16} aria-hidden="true" />
      </div>
    </header>
  );
}