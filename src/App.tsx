import HeroSection from './components/HeroSection';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UsersList from './components/User/UsersList';
import { getPositions } from './api/getPositions';
import { getUsers } from './api/getUsers';
import { useEffect, useRef, useState } from 'react';
import type { IPosition } from './interfaces/position.interface';
import type { IUser } from './interfaces/user.interface';
import { mergeUsersUnique } from './utils/mergeUsers';

export default function Main() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [loadingPositions, setLoadingPositions] = useState(true);

  const resetUsersRef = useRef(false);

  useEffect(() => {
    if (resetUsersRef.current) {
      resetUsersRef.current = false;
      return;
    }
    loadUsers(page);
  }, [page]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPositions();
        setPositions(data.positions);
      } catch (eror: any) {
        setPositionsError(eror.message);
      } finally {
        setLoadingPositions(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (positionsError) {
      const t = setTimeout(() => setPositionsError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [positionsError]);

  async function loadUsers(pageNum: number, reset = false) {
    setLoading(true);
    try {
      const data = await getUsers(pageNum);
      setUsers((prev) =>
        reset
          ? mergeUsersUnique([], data.users)
          : mergeUsersUnique(prev, data.users)
      );
      if (data.total_pages && pageNum >= data.total_pages) setHasMore(false);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Load failed');
    } finally {
      setLoading(false);
    }
  }

  const refreshUsers = async () => {
    resetUsersRef.current = true;
    setPage(1);
    setHasMore(true);
    await loadUsers(1, true);
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
          positions={positions}
          loadingPositions={loadingPositions}
          positionsError={positionsError}
          onSuccess={refreshUsers}
        />
      </section>
    </main>
  );
}
