import { API_URL, USERS_PER_PAGE } from '../config';
import type { IUsersResponse } from '../interfaces/usersResponse.interface';
import type { IApiError } from '../interfaces/apiError.interface';

export async function getUsers(page: number): Promise<IUsersResponse> {
  const url = `${API_URL}/users/?page=${page}&count=${USERS_PER_PAGE}&t=${Date.now()}`;
  const res = await fetch(url);

  const data = await res.json();
  if (!res.ok)
    throw new Error((data as IApiError).message || `HTTP ${res.status}`);
  if (!('success' in data) || !data.success) {
    throw new Error((data as IApiError).message || 'API success=false');
  }
  return data as IUsersResponse;
}
