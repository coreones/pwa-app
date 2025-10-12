export interface ApiResponse<T = any> {
  error: boolean;
  message: string;
  data: T | null;
}

export interface MultiLoginResponse {
  success: boolean;
  message: "close_other_running_session";
  data: null;
}
