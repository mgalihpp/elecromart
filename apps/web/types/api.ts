export type ApiResponse<T = unknown> = {
  message: string;
  success: boolean;
  data: T;
  error?: string;
  errors?: { field: string; message: string }[];
  errorCode?: string;
};
