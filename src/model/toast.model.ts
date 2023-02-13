export enum ToastType {
  Info ="info",
  Success = "success",
  Error = "error",
  Warning = "warning"
}

export interface ToastOptions {
  autoHide?: boolean;
  timeToLive?: number;
  showCloseButton?: boolean;
}

export interface Toast {
  id: string;
  type: ToastType;
  text: string;
  options?: ToastOptions;
}
