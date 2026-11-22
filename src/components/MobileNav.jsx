import { Calendar, CircleDot, LayoutGrid, List } from "lucide-react";
import { PlaceholderLink } from "./Sidebar.jsx";

export default function MobileNav({ page, onNavigate }) {
  return (
    <nav className="tabbar" aria-label="Mobile navigation">
      <a
        href="#dashboard"
        onClick={() => onNavigate("dashboard")}
        className={page === "dashboard" ? "active" : ""}
        aria-current={page === "dashboard" ? "page" : undefined}
      >
        <LayoutGrid size={22} aria-hidden="true" />
        <span>Overview</span>
      </a>
      <a
        href="#tasks"
        onClick={() => onNavigate("tasks")}
        className={page === "tasks" ? "active" : ""}
        aria-current={page === "tasks" ? "page" : undefined}
      >
        <List size={22} aria-hidden="true" />
        <span>Tasks</span>
      </a>
      <PlaceholderLink icon={Calendar}>Calendar</PlaceholderLink>
      <PlaceholderLink icon={CircleDot}>Settings</PlaceholderLink>
    </nav>
  );
}