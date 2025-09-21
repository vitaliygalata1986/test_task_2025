import { API_URL } from '../config';
import type { IPosition } from '../interfaces/position.interface';

export interface PositionsResponse {
  success: boolean;
  positions: IPosition[];
  message?: string;
}

export async function getPositions(): Promise<PositionsResponse> {
  const res = await fetch(`${API_URL}/positions`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `HTTP error ${res.status}`);
  }
  if (!data.success) {
    throw new Error(data.message || 'API success=false');
  }

  return data;
}
