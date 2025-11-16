// Global keybind manager
class KeybindManager {
  constructor() {
    this.keybinds = new Map();
    this.listeners = new Map();
  }

  setKeybind(action, keybind) {
    this.keybinds.set(action, keybind);
    // Notify all listeners for this action
    if (this.listeners.has(action)) {
      this.listeners.get(action).forEach((callback) => callback(keybind));
    }
  }

  getKeybind(action) {
    return this.keybinds.get(action);
  }

  getAllKeybinds() {
    return Object.fromEntries(this.keybinds);
  }

  onKeybindChange(action, callback) {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, []);
    }
    this.listeners.get(action).push(callback);

    // Return unsubscribe function
    return () => {
      const actionListeners = this.listeners.get(action);
      const index = actionListeners.indexOf(callback);
      if (index > -1) {
        actionListeners.splice(index, 1);
      }
    };
  }

  // Check if a keyboard event matches any keybind
  checkEvent(event, action) {
    const keybind = this.keybinds.get(action);
    if (!keybind) return false;

    const modifiers = [];
    if (event.ctrlKey) modifiers.push("Ctrl");
    if (event.shiftKey) modifiers.push("Shift");
    if (event.altKey) modifiers.push("Alt");
    if (event.metaKey) modifiers.push("Meta");

    const currentKeybind =
      modifiers.length > 0 ? `${modifiers.join("+")}+${event.key}` : event.key;

    return currentKeybind === keybind;
  }
}

// Create singleton instance
export const keybindManager = new KeybindManager();
