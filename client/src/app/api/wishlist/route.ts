type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
