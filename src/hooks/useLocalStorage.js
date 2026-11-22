import { useEffect, useState } from "react";
import { isTaskArray } from "../utils/taskHelpers.js";

export const STORAGE_KEY = "focusboard.tasks.v1";

// Reads saved tasks once on startup.
// tasks === null  -> nothing valid saved, so the caller should use sample data.
// tasks === []    -> the user deleted everything on purpose, so keep it empty.
export function readTaskCache() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return {
      tasks: null,
      error:
        "Browser storage is unavailable, so your changes won't be saved after a refresh.",
    };
  }
  if (raw === null) return { tasks: null, error: "" };
  try {
    const parsed = JSON.parse(raw);
    if (!isTaskArray(parsed)) throw new Error("Invalid task data");
    return { tasks: parsed, error: "" };
  } catch {
    return {
      tasks: null,
      error:
        "Saved browser data was invalid, so sample tasks are shown. Your next change will replace it.",
    };
  }
}

// Writes tasks to localStorage every time they change.
export function useLocalStorage(tasks, enabled) {
  const [error, setError] = useState("");
  useEffect(() => {
    if (!enabled) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setError("");
    } catch {
      setError(
        "Your browser could not save your tasks. Changes may be lost on refresh.",
      );
    }
  }, [tasks, enabled]);
  return error;
}