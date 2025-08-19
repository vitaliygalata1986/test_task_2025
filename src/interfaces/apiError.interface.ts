// Здесь описывается ошибка API, когда success = false:

export interface IApiError {
  success: false;
  message: string;
}
