import type { IUser } from '../interfaces/user.interface';
import { sortByRegistrationDate } from './sortByRegistrationDate';

export function mergeUsersUnique(prev: IUser[], next: IUser[]) {
  const byId = new Map<number, IUser>();
  for (const u of next) byId.set(u.id, u);
  for (const u of prev) byId.set(u.id, u);
  return sortByRegistrationDate([...byId.values()]);
}
