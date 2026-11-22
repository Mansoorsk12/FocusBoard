export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["High", "Medium", "Low"];
export const CATEGORIES = [
  "Development",
  "Design",
  "Personal",
  "Learning",
  "Work",
  "Other",
];
export const statusClass = (status) =>
  ({ "To do": "todo", "In progress": "progress", Completed: "completed" })[
    status
  ] || "todo";

export function validDate(value) {
  if (value === "") return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function validateTask(task) {
  const errors = {};
  if (!task.title?.trim())
    errors.title = "Give your task a title so you can find it later.";
  else if (task.title.trim().length > 120)
    errors.title = "Keep the title to 120 characters or fewer.";
  if (!STATUSES.includes(task.status))
    errors.status = "Choose one of the available statuses.";
  if (!PRIORITIES.includes(task.priority))
    errors.priority = "Choose a priority.";
  if (typeof task.category !== "string" || task.category.length > 60)
    errors.category = "Keep the category to 60 characters or fewer.";
  if (typeof task.description !== "string" || task.description.length > 2000)
    errors.description = "Keep the description to 2,000 characters or fewer.";
  if (!validDate(task.dueDate)) errors.dueDate = "Enter a valid date.";
  return errors;
}

export function isTaskArray(value) {
  if (!Array.isArray(value) || value.length > 5000) return false;
  const ids = new Set();
  return value.every((task) => {
    if (
      !task ||
      typeof task !== "object" ||
      typeof task.id !== "string" ||
      !task.id ||
      task.id.length > 100 ||
      ids.has(task.id)
    )
      return false;
    ids.add(task.id);
    return (
      typeof task.title === "string" &&
      Object.keys(validateTask(task)).length === 0
    );
  });
}

export function getStatistics(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In progress",
  ).length;
  return {
    total,
    completed,
    inProgress,
    percentage: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function filterTasks(
  tasks,
  { search = "", status = "All", priority = "All priorities" },
) {
  const query = search.trim().toLocaleLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLocaleLowerCase().includes(query) &&
      (status === "All" || task.status === status) &&
      (priority === "All priorities" || task.priority === priority),
  );
}

export function formatDate(value) {
  if (!value || !validDate(value)) return "No due date";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === "Completed") return false;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return task.dueDate < today;
}

// JSONB may reorder object keys; compare task values in a canonical field order.
export function taskSnapshot(tasks) {
  return JSON.stringify(
    tasks.map(
      ({ id, title, description, category, status, priority, dueDate }) => ({
        id,
        title,
        description,
        category,
        status,
        priority,
        dueDate,
      }),
    ),
  );
}
