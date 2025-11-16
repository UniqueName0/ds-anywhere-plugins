import { useState, useEffect } from "preact/hooks";
import { keybindManager } from "./keybindManager";

interface KeybindButtonProps {
  action: string;
  initialKey?: string;
  className?: string;
  onKeybindSet?: (action: string, keybind: string) => void;
  onKeybindConflict?: (
    action: string,
    keybind: string,
    conflictingAction: string,
  ) => void;
}

export default function KeybindButton({
  action,
  initialKey = "",
  className = "",
  onKeybindSet,
  onKeybindConflict,
}: KeybindButtonProps) {
  const [keybind, setKeybind] = useState<string>(initialKey);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Initialize from keybind manager
  useEffect(() => {
    const savedKeybind = keybindManager.getKeybind(action);
    if (savedKeybind) {
      setKeybind(savedKeybind);
    } else if (initialKey) {
      keybindManager.setKeybind(action, initialKey);
    }
  }, [action, initialKey]);

  // Listen for keybind changes from other components
  useEffect(() => {
    return keybindManager.onKeybindChange(action, (newKeybind: string) => {
      setKeybind(newKeybind);
      setError("");
    });
  }, [action]);

  useEffect(() => {
    if (!isListening) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      setError("");

      // Ignore modifier keys alone
      if (["Control", "Shift", "Alt", "Meta"].includes(event.key)) {
        return;
      }

      // Handle Escape key to cancel
      if (event.key === "Escape") {
        setIsListening(false);
        return;
      }

      const modifiers: string[] = [];
      if (event.ctrlKey) modifiers.push("Ctrl");
      if (event.shiftKey) modifiers.push("Shift");
      if (event.altKey) modifiers.push("Alt");
      if (event.metaKey) modifiers.push("Meta");

      const newKeybind =
        modifiers.length > 0
          ? `${modifiers.join("+")}+${event.key}`
          : event.key;

      // Check for conflicts
      const conflictingAction = findConflictingAction(newKeybind, action);
      if (conflictingAction) {
        setError(`Keybind already used by "${conflictingAction}"`);
        onKeybindConflict?.(action, newKeybind, conflictingAction);
        setIsListening(false);
        return;
      }

      setKeybind(newKeybind);
      setIsListening(false);
      keybindManager.setKeybind(action, newKeybind);
      onKeybindSet?.(action, newKeybind);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isListening, action, onKeybindSet, onKeybindConflict]);

  const handleClick = (): void => {
    setError("");
    setIsListening(true);
  };

  const handleClear = (): void => {
    setKeybind("");
    setError("");
    keybindManager.setKeybind(action, "");
    onKeybindSet?.(action, "");
  };

  // Helper function to find conflicting actions
  const findConflictingAction = (
    newKeybind: string,
    currentAction: string,
  ): string | null => {
    const allKeybinds = keybindManager.getAllKeybinds();
    for (const [action, keybind] of Object.entries(allKeybinds)) {
      if (action !== currentAction && keybind === newKeybind) {
        return action;
      }
    }
    return null;
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors ${className}`}
    >
      <span className="text-sm font-medium text-gray-700 min-w-[120px] flex-shrink-0">
        {action}:
      </span>

      <div className="flex flex-col gap-1 flex-1">
        <button
          onClick={handleClick}
          className={`
            px-3 py-2 text-sm border rounded-md min-w-[140px] text-left transition-all duration-200
            ${
              isListening
                ? "bg-blue-500 text-white border-blue-500 ring-2 ring-blue-200 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }
            ${error ? "border-red-300 bg-red-50" : ""}
          `}
          type="button"
        >
          {isListening ? "Press any key..." : keybind || "Click to set"}
        </button>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      {keybind && !isListening && (
        <button
          onClick={handleClear}
          className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
}
