import { API_URL } from '../config';
import type { IApiError } from '../interfaces/apiError.interface';
import type { ITokenResponse } from '../interfaces/token.interface';
import type { ICreateUserResponse } from '../interfaces/createUserResponse.interface';

export async function createUser(
  formData: FormData
): Promise<ICreateUserResponse> {
  const tokenRes = await fetch(`${API_URL}/token`, { cache: 'no-store' });
  const tokenData = (await tokenRes.json()) as ITokenResponse | IApiError;
  if (!tokenRes.ok || tokenData.success !== true) {
    throw new Error(
      ('message' in tokenData && tokenData.message) ||
        `Token HTTP ${tokenRes.status}`
    );
  }

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { Token: tokenData.token },
    body: formData,
  });
  const data = (await res.json()) as ICreateUserResponse | IApiError;

  if (!res.ok || data.success !== true) {
    throw new Error(
      ('message' in data && data.message) || `Register HTTP ${res.status}`
    );
  }

  return data;
}
