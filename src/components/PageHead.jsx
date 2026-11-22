import { useTasks } from "../context/TaskContext.jsx";
import SearchBar from "./SearchBar.jsx";

export default function PageHead({ page }) {
  const { openForm } = useTasks();
  const isTasks = page === "tasks";
  return (
    <div className="page-top">
      <div className="page-top-text">
        {isTasks ? (
          <>
            <h1>My tasks</h1>
            <p>Manage and track everything in one place.</p>
          </>
        ) : (
          <>
            <h1>
              Your work,
              <br className="br-phone" /> in focus.
            </h1>
            <p>
              <span className="only-wide">
                Plan your day, stay organized, and celebrate small wins.
              </span>
              <span className="only-phone">
                Stay organized and keep moving forward.
              </span>
            </p>
          </>
        )}
      </div>
      <div className="page-top-actions">
        {/* Temporary: the search box moves into the task filter bar in Step 5. */}
        <SearchBar />
        <button
          id="add-task"
          className="button button-primary"
          type="button"
          onClick={() => openForm()}
        >
          New task
        </button>
      </div>
    </div>
  );
}