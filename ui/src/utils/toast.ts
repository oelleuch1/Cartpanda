import { toast } from "sonner";
import { FunnelErrorCode } from "../../../domain";

const ERROR_MESSAGES: Record<FunnelErrorCode, string> = {
  [FunnelErrorCode.NODE_NOT_FOUND]: "This page doesn't exist in your funnel",
  [FunnelErrorCode.CANNOT_HAVE_OUTGOING_EDGE]:
    "Thank you pages can't connect to other pages",
  [FunnelErrorCode.EDGE_ALREADY_EXISTS]: "These pages are already connected",
  [FunnelErrorCode.NODE_CANNOT_BE_DUPLICATED]:
    "This page type already exists in your funnel",
};

export const showErrorToast = (code: FunnelErrorCode) => {
  toast.error(ERROR_MESSAGES[code] || "Something went wrong");
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const Toasts = {
  saved: () => showSuccessToast("Funnel saved successfully"),
  downloaded: () => showSuccessToast("Funnel downloaded"),
  undone: () => showInfoToast("Changes reverted"),
  nodeAdded: () => showSuccessToast("Page added to funnel"),
  nodeRemoved: () => showInfoToast("Page removed from funnel"),
  nodesConnected: () => showSuccessToast("Pages connected"),
  connectionRemoved: () => showInfoToast("Connection removed"),
  error: showErrorToast,
};
