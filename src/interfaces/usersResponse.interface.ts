import type { IUser } from './user.interface';


// Здесь описывается ответ API при получении списка пользователей:

export interface IUsersResponse {
  success: true;
  users: IUser[];
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
}
