import { memo } from "react";
import { CalendarDays, Check, Pencil, Trash2, ChevronDown } from "lucide-react";
import {
  formatDate,
  isOverdue,
  STATUSES,
  statusClass,
} from "../utils/taskHelpers.js";

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const complete = task.status === "Completed";
  const overdue = isOverdue(task);
  return (
    <article
      className={`task-row ${complete ? "task-complete" : ""}`}
      aria-labelledby={`task-${task.id}`}
    >
      <div className="task-primary">
        <button
          type="button"
          className={`task-checkbox ${complete ? "checked" : ""}`}
          aria-label={`${complete ? "Mark as to do" : "Complete task"}: ${task.title}`}
          aria-pressed={complete}
          onClick={() =>
            onStatusChange(task.id, complete ? "To do" : "Completed")
          }
        >
          {complete && <Check size={13} strokeWidth={3} />}
        </button>
        <div className="task-copy">
          <h3 id={`task-${task.id}`}>{task.title}</h3>
          <p>{task.description || "No description added."}</p>
          <span className="category-badge">
            {task.category || "Uncategorized"}
          </span>
        </div>
      </div>
      <div className="task-status">
        <label className="sr-only" htmlFor={`status-${task.id}`}>
          Status for {task.title}
        </label>
        <span className={`status-select ${statusClass(task.status)}`}>
          <span className="status-dot" aria-hidden="true" />
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
          >
            {STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <ChevronDown size={12} aria-hidden="true" />
        </span>
      </div>
      <div className="task-priority">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          <span aria-hidden="true" />
          {task.priority}
        </span>
      </div>
      <div className={`task-due ${overdue ? "overdue" : ""}`}>
        <CalendarDays size={14} aria-hidden="true" />
        <time dateTime={task.dueDate || undefined}>
          {formatDate(task.dueDate)}
        </time>
        {overdue && <span className="sr-only">, overdue</span>}
      </div>
      <div className="task-actions">
        <button
          className="icon-button"
          type="button"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task.id)}
        >
          <Pencil size={15} />
        </button>
        <button
          className="icon-button delete-action"
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
export default memo(TaskItem);
