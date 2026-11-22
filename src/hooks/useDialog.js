import { useEffect, useRef } from "react";

// Native dialogs provide modal semantics, focus containment, and Escape support.
export function useDialog(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      requestAnimationFrame(() => {
        if (previousFocus?.isConnected) previousFocus.focus();
        else document.querySelector("#add-task")?.focus();
      });
    };
  }, []);
  return {
    ref,
    onCancel: (event) => {
      event.preventDefault();
      onClose();
    },
  };
}
