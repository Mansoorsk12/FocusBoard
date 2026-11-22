import { SearchX, ListTodo, Plus, RotateCcw } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";

export default function EmptyState() {
  const { tasks, resetFilters, openForm } = useTasks();
  const empty = tasks.length === 0;
  const Icon = empty ? ListTodo : SearchX;
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon size={28} />
      </span>
      <h3>{empty ? "A clear slate. A fresh start." : "No tasks found"}</h3>
      <p>
        {empty
          ? "Add your first task and make a little room for progress."
          : "Try a different search or clear your filters to see more tasks."}
      </p>
      <button
        className={empty ? "button button-primary" : "button button-secondary"}
        type="button"
        
        onClick={() => (empty ? openForm() : resetFilters())}
      >
        {empty ? <Plus size={16} /> : <RotateCcw size={16} />}
        {empty ? "Create your first task" : "Clear all filters"}
      </button>
    </div>
  );
}
