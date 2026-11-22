// Pure reducer: every case returns a NEW state object, never mutates the old one.
export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        dialog: null,
        announcement: `Created ${action.task.title}.`,
      };
    case "EDIT":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task,
        ),
        dialog: null,
        announcement: `Updated ${action.task.title}.`,
      };
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
        dialog: null,
        announcement: "Task deleted.",
      };
    case "STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, status: action.status } : task,
        ),
        announcement: `Task marked ${action.status.toLowerCase()}.`,
      };
    case "FILTER":
      return { ...state, [action.key]: action.value };
    case "RESET_FILTERS":
      return {
        ...state,
        search: "",
        status: "All",
        priority: "All priorities",
      };
    case "DIALOG":
      return { ...state, dialog: action.dialog };
    case "SLIDE":
      return { ...state, slide: action.slide };
    default:
      return state;
  }
}