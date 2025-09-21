import type { IUser } from '../interfaces/user.interface';

export function sortByRegistrationDate(users: IUser[]) {
  return [...users].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  );
}