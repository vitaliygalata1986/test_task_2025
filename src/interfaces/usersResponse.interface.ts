import type { IUser } from './user.interface';

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
