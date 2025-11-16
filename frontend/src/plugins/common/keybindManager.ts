type Keybind = string;
type Action = string;
type KeybindCallback = (keybind: Keybind) => void;

class KeybindManager {
  private keybinds: Map<Action, Keybind>;
  private listeners: Map<Action, KeybindCallback[]>;

  constructor() {
    this.keybinds = new Map();
    this.listeners = new Map();
  }

  setKeybind(action: Action, keybind: Keybind): void {
    this.keybinds.set(action, keybind);
    // Notify all listeners for this action
    if (this.listeners.has(action)) {
      this.listeners.get(action)!.forEach((callback) => callback(keybind));
    }
  }

  getKeybind(action: Action): Keybind | undefined {
    return this.keybinds.get(action);
  }

  getAllKeybinds(): Record<Action, Keybind> {
    return Object.fromEntries(this.keybinds) as Record<Action, Keybind>;
  }

  onKeybindChange(action: Action, callback: KeybindCallback): () => void {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, []);
    }
    this.listeners.get(action)!.push(callback);

    // Return unsubscribe function
    return () => {
      const actionListeners = this.listeners.get(action);
      if (!actionListeners) return;

      const index = actionListeners.indexOf(callback);
      if (index > -1) {
        actionListeners.splice(index, 1);
      }
    };
  }

  // Check if a keyboard event matches any keybind
  checkEvent(event: KeyboardEvent, action: Action): boolean {
    const keybind = this.keybinds.get(action);
    if (!keybind) return false;

    const modifiers: string[] = [];
    if (event.ctrlKey) modifiers.push("Ctrl");
    if (event.shiftKey) modifiers.push("Shift");
    if (event.altKey) modifiers.push("Alt");
    if (event.metaKey) modifiers.push("Meta");

    const currentKeybind =
      modifiers.length > 0 ? `${modifiers.join("+")}+${event.key}` : event.key;

    return currentKeybind === keybind;
  }

  // Clear all keybinds
  clearKeybinds(): void {
    this.keybinds.clear();
    // Notify all listeners that keybinds were cleared
    this.listeners.forEach((callbacks, action) => {
      callbacks.forEach((callback) => callback(""));
    });
  }

  // Check if a keybind is already in use by another action
  isKeybindUsed(keybind: Keybind, excludeAction?: Action): boolean {
    for (const [action, existingKeybind] of this.keybinds) {
      if (excludeAction && action === excludeAction) continue;
      if (existingKeybind === keybind) return true;
    }
    return false;
  }
}

// Create singleton instance
export const keybindManager = new KeybindManager();
