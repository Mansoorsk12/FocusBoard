import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialTasks } from "../data/initialTasks.js";
import { readTaskCache, useLocalStorage } from "../hooks/useLocalStorage.js";
import { filterTasks, getStatistics } from "../utils/taskHelpers.js";
import { taskReducer } from "./taskReducer.js";

const TaskContext = createContext(null);

// Runs once. Saved tasks win; sample data is used only when nothing valid is saved.
function initialize() {
  const cache = readTaskCache();
  return {
    tasks: cache.tasks ?? initialTasks,
    cacheError: cache.error,
    search: "",
    status: "All",
    priority: "All priorities",
    slide: 0,
    dialog: null,
    announcement: "",
  };
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, undefined, initialize);
  const writeError = useLocalStorage(state.tasks, true);

  const setFilter = useCallback(
    (key, value) => dispatch({ type: "FILTER", key, value }),
    [],
  );
  const openForm = useCallback(
    (id = null) => dispatch({ type: "DIALOG", dialog: { kind: "form", id } }),
    [],
  );
  const closeDialog = useCallback(
    () => dispatch({ type: "DIALOG", dialog: null }),
    [],
  );
  const resetFilters = useCallback(
    () => dispatch({ type: "RESET_FILTERS" }),
    [],
  );
  const requestDelete = useCallback(
    (id) => dispatch({ type: "DIALOG", dialog: { kind: "delete", id } }),
    [],
  );
  const saveTask = useCallback(
    (task, editing) => dispatch({ type: editing ? "EDIT" : "ADD", task }),
    [],
  );
  const deleteTask = useCallback((id) => dispatch({ type: "DELETE", id }), []);
  const updateStatus = useCallback(
    (id, status) => dispatch({ type: "STATUS", id, status }),
    [],
  );
  const setSlide = useCallback(
    (slide) => dispatch({ type: "SLIDE", slide }),
    [],
  );

  // Derived values: always calculated from the single tasks array.
  const statistics = useMemo(() => getStatistics(state.tasks), [state.tasks]);
  const visibleTasks = useMemo(
    () => filterTasks(state.tasks, state),
    [state.tasks, state.search, state.status, state.priority],
  );

  const value = useMemo(
    () => ({
      ...state,
      statistics,
      visibleTasks,
      storageError: writeError || state.cacheError,
      setFilter,
      openForm,
      closeDialog,
      resetFilters,
      requestDelete,
      saveTask,
      deleteTask,
      updateStatus,
      setSlide,
    }),
    [
      state,
      statistics,
      visibleTasks,
      writeError,
      setFilter,
      openForm,
      closeDialog,
      resetFilters,
      requestDelete,
      saveTask,
      deleteTask,
      updateStatus,
      setSlide,
    ],
  );
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider.");
  return context;
}