/** Check if the modifier key (Ctrl on Windows/Linux, Cmd on Mac) is pressed */
export const isModifierKeyPressed = (event: KeyboardEvent): boolean =>
  event.ctrlKey || event.metaKey;

/** Check if a keyboard shortcut matches (modifier + key) */
export const isKeyboardShortcut = (
  event: KeyboardEvent,
  key: string,
): boolean =>
  isModifierKeyPressed(event) && event.key.toLowerCase() === key.toLowerCase();

/** Common keyboard shortcuts */
export const KeyboardShortcuts = {
  isUndo: (event: KeyboardEvent) => isKeyboardShortcut(event, "z"),
  isSave: (event: KeyboardEvent) => isKeyboardShortcut(event, "s"),
  isRedo: (event: KeyboardEvent) => isKeyboardShortcut(event, "y"),
  isCopy: (event: KeyboardEvent) => isKeyboardShortcut(event, "c"),
  isPaste: (event: KeyboardEvent) => isKeyboardShortcut(event, "v"),
  isCut: (event: KeyboardEvent) => isKeyboardShortcut(event, "x"),
} as const;
