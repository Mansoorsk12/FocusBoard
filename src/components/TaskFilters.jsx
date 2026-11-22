import { SlidersHorizontal } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";
import { PRIORITIES, STATUSES } from "../utils/taskHelpers.js";

export default function TaskFilters() {
  const { tasks, status, priority, setFilter } = useTasks();
  return (
    <div className="task-filters">
      <div
        className="status-tabs"
        role="group"
        aria-label="Filter tasks by status"
      >
        {["All", ...STATUSES].map((item) => {
          const count =
            item === "All"
              ? tasks.length
              : tasks.filter((task) => task.status === item).length;
          return (
            <button
              type="button"
              key={item}
              aria-pressed={status === item}
              className={status === item ? "active" : ""}
              onClick={() => setFilter("status", item)}
            >
              {item}
              <span>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="priority-filter">
        <SlidersHorizontal size={15} aria-hidden="true" />
        <label className="sr-only" htmlFor="priority-filter">
          Filter by priority
        </label>
        <select
          id="priority-filter"
          value={priority}
          onChange={(event) => setFilter("priority", event.target.value)}
        >
          <option>All priorities</option>
          {PRIORITIES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
