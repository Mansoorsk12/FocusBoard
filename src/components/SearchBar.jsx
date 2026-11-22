import { Search, X } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";

export default function SearchBar() {
  const { search, setFilter } = useTasks();
  return (
    <div className="search-field">
      <Search size={17} aria-hidden="true" />
      <label className="sr-only" htmlFor="task-search">
        Search tasks by title
      </label>
      <input
        id="task-search"
        type="search"
        placeholder="Search your tasks..."
        value={search}
        onChange={(event) => setFilter("search", event.target.value)}
        autoComplete="off"
      />
      {search && (
        <button
          className="search-clear"
          type="button"
          onClick={() => setFilter("search", "")}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
