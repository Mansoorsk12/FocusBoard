import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import PageHead from "./components/PageHead.jsx";
import MobileNav from "./components/MobileNav.jsx";
import OverviewCards from "./components/OverviewCards.jsx";
import FocusNotesCarousel from "./components/FocusNotesCarousel.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import { useTasks } from "./context/TaskContext.jsx";

function currentPage() {
  return window.location.hash === "#tasks" ? "tasks" : "dashboard";
}

export default function App() {
  const [page, setPage] = useState(currentPage);
  const mainRef = useRef(null);
  const { tasks, dialog, announcement, storageError } = useTasks();

  // Keep the page in sync with the browser back/forward buttons.
  useEffect(() => {
    const handleHash = () => setPage(currentPage());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const dialogTask = dialog?.id
    ? tasks.find((task) => task.id === dialog.id)
    : null;

  return (
    <div className="shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <Sidebar page={page} onNavigate={setPage} />
      <div className="shell-main">
        <Topbar page={page} />
        <main id="main" className="page" tabIndex={-1} ref={mainRef}>
          <PageHead page={page} />
          {storageError && (
            <div className="storage-notice" role="status">
              <AlertCircle size={17} />
              <p>{storageError}</p>
            </div>
          )}
          {page === "dashboard" && (
            <>
              <FocusNotesCarousel />
              <OverviewCards />
            </>
          )}
          <TaskList />
        </main>
      </div>
      <MobileNav page={page} onNavigate={setPage} />
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      {dialog?.kind === "form" && (
        <TaskForm key={dialog.id || "new"} task={dialogTask} />
      )}
      {dialog?.kind === "delete" && dialogTask && (
        <DeleteConfirmation task={dialogTask} />
      )}
    </div>
  );
}