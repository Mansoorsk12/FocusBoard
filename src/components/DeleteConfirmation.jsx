import { Trash2, X } from "lucide-react";
import { useTasks } from "../context/TaskContext.jsx";
import { useDialog } from "../hooks/useDialog.js";

export default function DeleteConfirmation({ task }) {
  const { deleteTask, closeDialog } = useTasks();
  const dialog = useDialog(closeDialog);
  return (
    <dialog
      className="delete-dialog"
      ref={dialog.ref}
      onCancel={dialog.onCancel}
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <div className="dialog-heading">
        <span className="dialog-symbol danger">
          <Trash2 size={23} />
        </span>
        <button
          type="button"
          className="icon-button"
          onClick={closeDialog}
          aria-label="Close delete confirmation"
        >
          <X size={20} />
        </button>
      </div>
      <h2 id="delete-title">Delete this task?</h2>
      <p id="delete-description">
        “{task.title}” will be removed from your board. This action cannot be
        undone.
      </p>
      <div className="delete-footer">
        <button
          autoFocus
          type="button"
          className="button button-secondary"
          onClick={closeDialog}
        >
          Cancel
        </button>
        <button
          type="button"
          className="button button-danger"
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 size={16} />
          Delete task
        </button>
      </div>
    </dialog>
  );
}
