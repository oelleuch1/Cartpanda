/** Standard icon sizes for consistent styling */
export const ICON_SIZE = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
} as const;

export type IconSize = keyof typeof ICON_SIZE;
