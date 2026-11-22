import test from "node:test";
import assert from "node:assert/strict";

import {
  filterTasks,
  getStatistics,
  isTaskArray,
  validDate,
  validateTask,
  taskSnapshot,
} from "../src/utils/taskHelpers.js";
import { taskReducer } from "../src/context/taskReducer.js";
// Fixed test data. It is separate from the app's sample data so these tests
// keep passing when the sample tasks change.
const initialTasks = [
  { id: "sample-01", title: "Complete React assignment", description: "Build the dashboard.", category: "Development", status: "In progress", priority: "High", dueDate: "2026-11-25" },
  { id: "sample-02", title: "Explore dashboard references", description: "Review layouts.", category: "Design", status: "Completed", priority: "Medium", dueDate: "2026-11-22" },
  { id: "sample-03", title: "Plan the week ahead", description: "Break down work.", category: "Personal", status: "To do", priority: "Low", dueDate: "2026-11-24" },
  { id: "sample-04", title: "Review component accessibility", description: "Check labels.", category: "Development", status: "To do", priority: "High", dueDate: "2026-11-26" },
  { id: "sample-05", title: "Read about React patterns", description: "Take notes.", category: "Learning", status: "In progress", priority: "Medium", dueDate: "2026-11-27" },
  { id: "sample-06", title: "Organize project workspace", description: "Clean up files.", category: "Personal", status: "Completed", priority: "Low", dueDate: "2026-11-21" },
];

const startingState = () => ({
  tasks: structuredClone(initialTasks),
  dialog: null,
  search: "",
  status: "All",
  priority: "All priorities",
  slide: 0,
});

test("statistics handle an empty board and derive the completion percentage", () => {
  assert.deepEqual(getStatistics([]), {
    total: 0,
    completed: 0,
    inProgress: 0,
    percentage: 0,
  });
  assert.deepEqual(getStatistics(initialTasks), {
    total: 6,
    completed: 2,
    inProgress: 2,
    percentage: 33,
  });
});

test("search, status and priority combine without changing the source", () => {
  const before = JSON.stringify(initialTasks);
  const matches = filterTasks(initialTasks, {
    search: "  REACT ",
    status: "In progress",
    priority: "High",
  });
  assert.equal(matches.length, 1);
  assert.equal(matches[0].id, "sample-01");
  assert.equal(
    filterTasks(initialTasks, {
      search: "React",
      status: "Completed",
      priority: "High",
    }).length,
    0,
  );
  assert.equal(JSON.stringify(initialTasks), before);
});

test("task mutations remain immutable and statistics follow each operation", () => {
  const state = startingState();
  const frozen = JSON.stringify(state);
  const task = { ...initialTasks[0], id: "new", status: "To do" };
  const added = taskReducer(state, { type: "ADD", task });
  assert.equal(getStatistics(added.tasks).total, 7);
  const edited = taskReducer(added, {
    type: "EDIT",
    task: { ...task, title: "Edited title" },
  });
  assert.equal(
    edited.tasks.find((item) => item.id === "new").title,
    "Edited title",
  );
  const completed = taskReducer(edited, {
    type: "STATUS",
    id: "new",
    status: "Completed",
  });
  assert.equal(getStatistics(completed.tasks).completed, 3);
  const deleted = taskReducer(completed, { type: "DELETE", id: "new" });
  assert.deepEqual(getStatistics(deleted.tasks), getStatistics(state.tasks));
  assert.equal(JSON.stringify(state), frozen);
});

test("deleting the final task produces a valid empty board", () => {
  const state = { ...startingState(), tasks: [initialTasks[0]] };
  const result = taskReducer(state, { type: "DELETE", id: initialTasks[0].id });
  assert.deepEqual(result.tasks, []);
  assert.equal(isTaskArray(result.tasks), true);
  assert.equal(getStatistics(result.tasks).percentage, 0);
});

test("stored task validation preserves empty arrays and rejects corrupt records", () => {
  assert.equal(isTaskArray([]), true);
  assert.equal(isTaskArray(initialTasks), true);
  assert.equal(isTaskArray(null), false);
  assert.equal(isTaskArray({ tasks: [] }), false);
  assert.equal(isTaskArray([{}]), false);
  assert.equal(isTaskArray([initialTasks[0], initialTasks[0]]), false);
  assert.equal(isTaskArray([{ ...initialTasks[0], status: "Unknown" }]), false);
  assert.equal(
    isTaskArray([{ ...initialTasks[0], dueDate: "2026-02-30" }]),
    false,
  );
});

test("form validation rejects whitespace titles and impossible dates", () => {
  assert.ok(validateTask({ ...initialTasks[0], title: "   " }).title);
  assert.equal(validDate("2026-02-30"), false);
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate(""), true);
  assert.equal(validDate("not-a-date"), false);
  assert.deepEqual(
    validateTask({ ...initialTasks[0], description: "", dueDate: "" }),
    {},
  );
});

test("opening and cancelling deletion do not remove a task", () => {
  const state = startingState();
  const opened = taskReducer(state, {
    type: "DIALOG",
    dialog: { kind: "delete", id: "sample-01" },
  });
  const cancelled = taskReducer(opened, { type: "DIALOG", dialog: null });
  assert.equal(cancelled.tasks, state.tasks);
  assert.equal(cancelled.tasks.length, 6);
});

test("filter state and carousel state do not mutate tasks", () => {
  const state = startingState();
  const filtered = taskReducer(state, {
    type: "FILTER",
    key: "status",
    value: "Completed",
  });
  const slide = taskReducer(filtered, { type: "SLIDE", slide: 2 });
  assert.equal(slide.slide, 2);
  assert.equal(slide.tasks, state.tasks);
  const cleared = taskReducer(slide, { type: "RESET_FILTERS" });
  assert.equal(cleared.status, "All");
  assert.equal(cleared.tasks, state.tasks);
});

test("persistence fingerprints ignore JSON object key ordering", () => {
  const task = initialTasks[0];
  const reordered = Object.fromEntries(Object.entries(task).reverse());
  assert.equal(taskSnapshot([task]), taskSnapshot([reordered]));
  assert.notEqual(
    taskSnapshot([task]),
    taskSnapshot([{ ...task, title: "New title" }]),
  );
});
