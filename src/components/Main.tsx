import { useEffect, useRef, useState } from 'react';
import type { IApiError } from '../interfaces/apiError.interface';
import type { IPosition } from '../interfaces/position.interface';
import type { IUser } from '../interfaces/user.interface';
import type { IUsersResponse } from '../interfaces/usersResponse.interface';
import HeroSection from './HeroSection';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import UsersList from './User/UsersList';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';
type UsersApiResult = IUsersResponse | IApiError;

function sortUsersByNewest(users: IUser[]): IUser[] {
  return [...users].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  );
}

export default function Main() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [positions, setPositions] = useState<IPosition[]>([]);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(true);

  const resetUsersRef = useRef(false);
  const count = 6;

  useEffect(() => {
    if (resetUsersRef.current) {
      resetUsersRef.current = false;
      return;
    }
    getUsers(page);
  }, [page]);

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (positionsError) {
      const timer = setTimeout(() => setPositionsError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [positionsError]);

  async function getUsers(pageNum: number, reset: boolean = false) {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/users/?page=${pageNum}&count=${count}`
      );
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data: UsersApiResult = await res.json();
      if (!('success' in data) || !data.success) {
        throw new Error((data as IApiError).message || 'API success=false');
      }

      if (reset) {
        setUsers(sortUsersByNewest(data.users));
      } else {
        setUsers((prev) => sortUsersByNewest([...prev, ...data.users]));
      }

      if (data.total_pages && pageNum >= data.total_pages) setHasMore(false);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('getUsers error:', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function getPositions() {
    setLoadingPositions(true);
    setPositionsError(null);
    try {
      const res = await fetch(`${API_URL}/positions`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error ${res.status}`);
      if (!data.success) throw new Error(data.message || 'API success=false');
      setPositions(data.positions);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('getPositions error:', msg);
      setPositionsError(msg);
    } finally {
      setLoadingPositions(false);
    }
  }

  const refreshUsers = async () => {
    resetUsersRef.current = true;
    setPage(1);
    setHasMore(true);
    await getUsers(1, true);
  };

  return (
    <main className="m-auto max-w-[1170px]">
      <HeroSection />

      <UsersList
        users={users}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onShowMore={() => setPage((p) => p + 1)}
      />

      <section className="pb-[100px] px-4">
        <RegistrationForm
          apiUrl={API_URL}
          positions={positions}
          loadingPositions={loadingPositions}
          positionsError={positionsError}
          onSuccess={refreshUsers}
        />
      </section>
    </main>
  );
}
