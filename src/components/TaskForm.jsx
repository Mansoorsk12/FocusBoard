import { useRef, useState } from "react";
import { X, Plus, Pencil, AlignLeft, CalendarDays } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";
import { useDialog } from "../hooks/useDialog.js";
import {
  CATEGORIES,
  PRIORITIES,
  STATUSES,
  validateTask,
} from "../utils/taskHelpers.js";

export default function TaskForm({ task }) {
  const { saveTask, closeDialog } = useTasks();
  const editing = Boolean(task);
  const [values, setValues] = useState(() =>
    task
      ? { ...task }
      : {
          title: "",
          description: "",
          category: "Work",
          status: "To do",
          priority: "Medium",
          dueDate: "",
        },
  );
  const [errors, setErrors] = useState({});
  const submitted = useRef(false);
  const dialog = useDialog(closeDialog);
  function update(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted.current) setErrors(validateTask(next));
  }
  function submit(event) {
    event.preventDefault();
    submitted.current = true;
    const nextErrors = validateTask(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      dialog.ref.current
        .querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    saveTask(
      {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        id: task?.id || crypto.randomUUID(),
      },
      editing,
    );
  }
  function accessibility(name) {
    return {
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }
  function error(name) {
    return (
      errors[name] && (
        <span className="field-error" id={`${name}-error`} role="alert">
          {errors[name]}
        </span>
      )
    );
  }
  return (
    <dialog
      className="task-dialog"
      ref={dialog.ref}
      onCancel={dialog.onCancel}
      aria-labelledby="form-title"
      aria-describedby="form-description"
    >
      <form noValidate onSubmit={submit}>
        <div className="dialog-heading">
          <div className="dialog-symbol">
            {editing ? <Pencil size={22} /> : <Plus size={24} />}
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={closeDialog}
            aria-label="Close task form"
          >
            <X size={21} />
          </button>
        </div>
        <h2 id="form-title">
          {editing ? "A little fine-tuning." : "Make room for your next idea."}
        </h2>
        <p id="form-description">
          {editing
            ? "Update the details and keep things moving."
            : "Turn what’s on your mind into a task you can act on."}
        </p>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="task-title">
              Task title <span aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </label>
            <input
              autoFocus
              id="task-title"
              name="title"
              placeholder="What would you like to get done?"
              value={values.title}
              onChange={update}
              maxLength={120}
              required
              {...accessibility("title")}
            />
            {error("title")}
          </div>
          <div className="form-field">
            <label htmlFor="description">
              Description <span className="optional">Optional</span>
            </label>
            <div className="textarea-wrap">
              <AlignLeft size={16} aria-hidden="true" />
              <textarea
                id="description"
                name="description"
                placeholder="Add a little detail..."
                value={values.description}
                onChange={update}
                maxLength={2000}
                rows={3}
                {...accessibility("description")}
              />
            </div>
            {error("description")}
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                list="category-options"
                name="category"
                value={values.category}
                onChange={update}
                maxLength={60}
                placeholder="Choose or add a category"
                {...accessibility("category")}
              />
              <datalist id="category-options">
                {CATEGORIES.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
              {error("category")}
            </div>
            <div className="form-field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={update}
                {...accessibility("status")}
              >
                {STATUSES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {error("status")}
            </div>
          </div>
          <fieldset className="form-field priority-field">
            <legend>Priority</legend>
            <div className="priority-options">
              {PRIORITIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`priority-choice ${item.toLowerCase()} ${values.priority === item ? "selected" : ""}`}
                  aria-pressed={values.priority === item}
                  onClick={() =>
                    setValues((current) => ({ ...current, priority: item }))
                  }
                >
                  <span />
                  {item}
                </button>
              ))}
            </div>
            {error("priority")}
          </fieldset>
          <div className="form-field">
            <label htmlFor="dueDate">
              Due date <span className="optional">Optional</span>
            </label>
            <div className="date-wrap">
              <CalendarDays size={17} aria-hidden="true" />
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={values.dueDate}
                min="0001-01-01"
                max="9999-12-31"
                onChange={update}
                {...accessibility("dueDate")}
              />
            </div>
            {error("dueDate")}
          </div>
        </div>
        <div className="dialog-footer">
          <span>
            <span className="required-star">*</span> Just a title to get started
          </span>
          <div>
            <button
              className="button button-secondary"
              type="button"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button className="button button-primary" type="submit">
              {editing ? <Pencil size={16} /> : <Plus size={17} />}
              {editing ? "Save changes" : "Create task"}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
