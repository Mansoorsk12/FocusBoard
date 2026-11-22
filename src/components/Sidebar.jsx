import { Calendar, CircleDot, LayoutGrid, List } from "lucide-react";

export function Logo() {
  return (
    <a className="logo" href="#dashboard" aria-label="FocusBoard home">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="logo-text">FocusBoard</span>
    </a>
  );
}

// Calendar and Settings are visual placeholders (they are not part of the assignment).
export function PlaceholderLink({ icon: Icon, children, className }) {
  return (
    <button
      type="button"
      className={className}
      aria-disabled="true"
      title="Placeholder — not part of this assignment"
    >
      <Icon size={20} aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
}

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="side">
      <Logo />
      <div className="side-caption">WORKSPACE</div>
      <nav aria-label="Main navigation" className="side-nav">
        <a
          href="#dashboard"
          onClick={() => onNavigate("dashboard")}
          className={page === "dashboard" ? "side-link active" : "side-link"}
          aria-current={page === "dashboard" ? "page" : undefined}
        >
          <LayoutGrid size={20} aria-hidden="true" />
          <span>Overview</span>
        </a>
        <a
          href="#tasks"
          onClick={() => onNavigate("tasks")}
          className={page === "tasks" ? "side-link active" : "side-link"}
          aria-current={page === "tasks" ? "page" : undefined}
        >
          <List size={20} aria-hidden="true" />
          <span>My tasks</span>
        </a>
        <PlaceholderLink icon={Calendar} className="side-link">
          Calendar
        </PlaceholderLink>
        <PlaceholderLink icon={CircleDot} className="side-link">
          Settings
        </PlaceholderLink>
      </nav>
    </aside>
  );
}