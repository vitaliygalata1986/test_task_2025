import { useState } from 'react';
import Heading from '../Headling/Headling';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Preloader from '../Preloader';
import SuccessMessage from '../SuccessMessage';
import { PhotoUpload } from '../PhotoUpload/PhotoUpload';
import { validateForm } from '../../utils/userForm';
import type { IPosition } from '../../interfaces/position.interface';
import { createUser } from '../../api/createUser';

type Props = {
  positions: IPosition[];
  loadingPositions: boolean;
  positionsError: string | null;
  onSuccess: () => Promise<void> | void;
};

export default function RegistrationForm({
  positions,
  loadingPositions,
  positionsError,
  onSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <SuccessMessage />;

  return (
    <>
      <Heading tag="h2" className="mb-[50px]">
        Working with POST request
      </Heading>

      {serverError && (
        <div className="text-[var(--border-input-invalid)] text-center mb-[50px]">
          {serverError}
        </div>
      )}

      <form
        className="max-w-[380px] mx-auto flex flex-col gap-5"
        onChange={(e) => {
          const form = e.currentTarget as HTMLFormElement;
          const { valid, errors } = validateForm(form);
          setErrors(errors);
          setIsValid(valid);
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          
          const form = e.currentTarget as HTMLFormElement;
          const { valid, errors } = validateForm(form);

          setErrors(errors);
          setIsValid(valid);

          if (!valid) return;

          setSubmitting(true);
          setServerError(null);

          try {
            const formData = new FormData(form);
            await createUser(formData);
            form.reset();
            setName('');
            setEmail('');
            setPhone('');
            setPhoto(null);
            setErrors({ name: '', email: '', phone: '', photo: '' });
            setSubmitted(true);

            await onSuccess();
          } catch (err: any) {
            setServerError(err?.message || 'Register failed');
          } finally {
            setSubmitting(false);
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

        <div className="relative z-0 w-full mb-[5px] group">
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
              {positions.map((p, idx) => (
                <label
                  key={p.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative w-[20px] h-[20px]">
                    <input
                      type="radio"
                      name="position_id"
                      value={p.id}
                      defaultChecked={idx === 0}
                      className="peer sr-only"
                    />
                    <div
                      className="w-full h-full rounded-full border border-[#D0CFCF]
                                    peer-checked:border-[rgba(0,189,211,1)]
                                    peer-checked:ring-1 peer-checked:ring-[rgba(0,189,211,1)]"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 w-[10px] h-[10px]
                                    bg-[rgba(0,189,211,1)] rounded-full transform
                                    -translate-x-1/2 -translate-y-1/2 scale-0
                                    peer-checked:scale-100"
                    />
                  </div>
                  <span className="text-base text-[var(--text-black-color)]">
                    {p.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-[10px]">
          <PhotoUpload photo={photo} onChange={setPhoto} error={errors.photo} />
        </div>

        <Button
          disabled={!isValid || submitting}
          type="submit"
          className="w-[120px] mx-auto mt-[30px]"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </Button>
      </form>
    </>
  );
}
