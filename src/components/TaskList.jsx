import { ListTodo } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";
import TaskFilters from "./TaskFilters.jsx";
import TaskItem from "./TaskItem.jsx";
import EmptyState from "./EmptyState.jsx";

export default function TaskList() {
  const {
    tasks,
    visibleTasks,
    openForm,
    requestDelete,
    updateStatus,
    search,
    status,
    priority,
    resetFilters,
  } = useTasks();
  const filtered = search || status !== "All" || priority !== "All priorities";
  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="section-heading task-section-heading">
        <div>
          <h2 id="tasks-heading">
            Your tasks <span className="heading-count">{tasks.length}</span>
          </h2>
          <p>A place for everything on your mind.</p>
        </div>
        <span className="list-view-label">
          <ListTodo size={16} />
          List view
        </span>
      </div>
      <div className="task-panel">
        <TaskFilters />
        <div className="table-heading" aria-hidden="true">
          <span>Task name</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Due date</span>
          <span className="align-right">Actions</span>
        </div>
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={openForm}
              onDelete={requestDelete}
              onStatusChange={updateStatus}
            />
          ))}
          {!visibleTasks.length && <EmptyState />}
        </div>
        <div className="task-list-footer">
          <p aria-live="polite" aria-atomic="true">
            Showing <strong>{visibleTasks.length}</strong> of{" "}
            <strong>{tasks.length}</strong> tasks
          </p>
          {filtered ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-button"
            >
              Clear filters
            </button>
          ) : (
            <span>Little by little, a lot gets done.</span>
          )}
        </div>
      </div>
    </section>
  );
}
