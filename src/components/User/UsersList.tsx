import type { IUser } from '../../interfaces/user.interface';
import Button from '../Button/Button';
import Heading from '../Headling/Headling';
import Preloader from '../Preloader';
import User from './User';

type Props = {
  users: IUser[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onShowMore: () => void;
};

export default function UsersList({
  users,
  loading,
  error,
  hasMore,
  onShowMore,
}: Props) {
  return (
    <section className="py-[140px] px-4 md:px-8 lg:px-[60px] xl:px-0">
      <Heading tag="h2" className="mb-[50px]">
        Working with GET request
      </Heading>

      {error && (
        <div className="text-[var(--border-input-invalid)] text-center mb-[50px]">
          {error}
        </div>
      )}

      {loading && <Preloader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-4 lg:gap-[29px]">
        {users.map((user) => (
          <User key={`${user.id}`} {...user} />
        ))}
      </div>

      {hasMore && (
        <Button
          className="block w-[120px] mx-auto mt-[50px]"
          onClick={onShowMore}
          disabled={loading}
        >
          Show more
        </Button>
      )}
    </section>
  );
}
