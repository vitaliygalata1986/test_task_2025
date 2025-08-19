import { useEffect, useRef, useState } from 'react';
import User from './User';
import Button from '../Button/Button';
import Heading from '../Headling/Headling';
import Preloader from '../Preloader';
import SuccessMessage from '../SuccessMessage';
import Input from '../Input/Input';
import type { IApiError } from '../../interfaces/apiError.interface';
import type { IUser } from '../../interfaces/user.interface';
import type { IUsersResponse } from '../../interfaces/usersResponse.interface';
import type { IPosition } from '../../interfaces/position.interface';

import { PhotoUpload } from '../PhotoUpload/PhotoUpload';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

type UsersApiResult = IUsersResponse | IApiError;

function UsersList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const resetUsersRef = useRef(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
  });

  const count = 6;

  function sortUsersByNewest(users: IUser[]): IUser[] {
    return [...users].sort(
      (a, b) => b.registration_timestamp - a.registration_timestamp
    );
  }

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
      const timer = setTimeout(() => {
        setError('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (errorRegister) {
      const timer = setTimeout(() => {
        setErrorRegister('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorRegister]);

  useEffect(() => {
    if (positionsError) {
      const timer = setTimeout(() => {
        setPositionsError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [positionsError]);

  async function getUsers(page: number, reset: boolean = false) {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/users/?page=${page}&count=${count}`
      );

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data: UsersApiResult = await response.json();

      if (!data.success) throw new Error(data.message || 'API success=false');

      const sortedUsers = sortUsersByNewest(data.users);

      if (reset) {
        setUsers(sortedUsers);
      } else {
        setUsers((prev) => sortUsersByNewest([...prev, ...data.users]));
      }

      if (data.total_pages && page >= data.total_pages) {
        setHasMore(false);
      }

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
      const response = await fetch(`${API_URL}/positions`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.message || 'API success=false');
      }

      setPositions(data.positions);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('getPositions error:', msg);
      setPositionsError(msg);
    } finally {
      setLoadingPositions(false);
    }
  }

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      photo: '',
    };

    const name = formData.get('name')?.toString().trim() || '';
    if (name.length < 2 || name.length > 60) {
      newErrors.name = 'Username should contain 2-60 characters';
      valid = false;
    }

    const email = formData.get('email')?.toString().trim() || '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email) || email.length < 6 || email.length > 100) {
      newErrors.email =
        'Please enter a valid email address like example@email.com';
      valid = false;
    }

    const phone = formData.get('phone')?.toString().trim() || '';
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Number should start with code of Ukraine +380';
      valid = false;
    }

    const file = formData.get('photo') as File | null;
    if (!file) {
      newErrors.photo = 'Photo is required';
      valid = false;
    } else if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
      newErrors.photo = 'Only JPEG/JPG allowed';
      valid = false;
    } else if (file.size > 5 * 1024 * 1024) {
      newErrors.photo = 'Max photo size is 5MB';
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
    return valid;
  }

  return (
    <>
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
          {users.map((users) => (
            <User key={users.id} {...users} />
          ))}
        </div>
        {hasMore && (
          <Button
            className="block w-[120px] mx-auto mt-[50px]"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
          >
            Show more
          </Button>
        )}
      </section>
      <section className="pb-[100px] px-4">
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <>
            <Heading
              tag="h2"
              className="mb-[50px]"
            >
              Working with POST request
            </Heading>
            {errorRegister && (
              <div className="text-[var(--border-input-invalid)] text-center mb-[50px]">
                {errorRegister}
              </div>
            )}
            <form
              className="max-w-[380px] mx-auto flex flex-col gap-5"
              onChange={(e) => {
                const form = e.currentTarget as HTMLFormElement;
                validateForm(form);
              }}
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.target as HTMLFormElement;

                if (!validateForm(form)) return;

                const formData = new FormData(form);

                try {
                  const tokenRes = await fetch(`${API_URL}/token`);
                  const tokenData = await tokenRes.json();
                  const token = tokenData.token;

                  const res = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: {
                      Token: token,
                    },
                    body: formData,
                  });

                  const result = await res.json();
                  if (!result.success)
                    throw new Error(result.message || 'Register failed');

                  form.reset();
                  setName('');
                  setEmail('');
                  setPhone('');
                  setPhoto(null);
                  setErrors({ name: '', email: '', phone: '', photo: '' });
                  resetUsersRef.current = true;
                  setPage(1);
                  setHasMore(true);
                  setIsSubmitted(true);
                  await getUsers(1, true);
                } catch (e: unknown) {
                  const msg = e instanceof Error ? e.message : String(e);
                  console.error('Registration error:', msg);
                  setErrorRegister(msg);
                }
              }}
            >
              <div className="relative z-0 w-full mb-[30px] group">
                <Input
                  label="Your name"
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-[30px] group">
                <Input
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-[30px] group">
                <Input
                  label="Phone"
                  name="phone"
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  hint="+38 (XXX) XXX - XX - XX"
                  required
                />
              </div>
              <div>
                <p className="mb-[11px] text-base leading-[26px]">
                  Select your position
                </p>

                {positionsError && (
                  <div className="text-[var(--border-input-invalid)] text-sm mb-4">
                    {positionsError}
                  </div>
                )}

                {loadingPositions && <Preloader />}

                {!positionsError && !loadingPositions && (
                  <div className="space-y-4">
                    {positions.map((position, idx) => (
                      <label
                        key={position.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div className="relative w-[20px] h-[20px]">
                          <input
                            type="radio"
                            name="position_id"
                            value={position.id}
                            defaultChecked={idx === 0}
                            className="peer sr-only text-base leading-[26px]"
                          />
                          <div className="w-full h-full rounded-full border border-[#D0CFCF] peer-checked:border-[rgba(0,189,211,1)] peer-checked:ring-1 peer-checked:ring-[rgba(0,189,211,1)] transition-colors duration-200" />
                          <div className="absolute top-1/2 left-1/2 w-[10px] h-[10px] bg-[rgba(0,189,211,1)] rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200" />
                        </div>
                        <span className="text-base text-[var(--text-black-color)]">
                          {position.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <PhotoUpload
                  photo={photo}
                  onChange={(file) => setPhoto(file)}
                  error={errors.photo}
                />
              </div>

              <Button
                disabled={!isFormValid}
                type="submit"
                className="w-[120px] mx-auto mt-[30px]"
              >
                Sign up
              </Button>
            </form>
          </>
        )}
      </section>
    </>
  );
}

export default UsersList;
