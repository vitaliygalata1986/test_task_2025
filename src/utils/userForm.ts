export type UserFormErrors = {
  name: string;
  email: string;
  phone: string;
  photo: string;
};

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^\+380\d{9}$/;


export function validateForm(form: HTMLFormElement): {
  valid: boolean;
  errors: UserFormErrors;
} {
  const fd = new FormData(form);

  const errors: UserFormErrors = { name: '', email: '', phone: '', photo: '' };
  let valid = true;

  const name = (fd.get('name')?.toString() ?? '').trim();
  if (name.length < 2 || name.length > 60) {
    errors.name = 'Username should contain 2-60 characters';
    valid = false;
  }

  const email = (fd.get('email')?.toString() ?? '').trim();
  if (!EMAIL_RE.test(email) || email.length < 6 || email.length > 100) {
    errors.email = 'Please enter a valid email address like example@email.com';
    valid = false;
  }

  const phone = (fd.get('phone')?.toString() ?? '').trim();
  if (!PHONE_RE.test(phone)) {
    errors.phone = 'Number should start with code of Ukraine +380';
    valid = false;
  }

  const file = (fd.get('photo') as File | null) ?? null;
  if (!file) {
    errors.photo = 'Photo is required';
    valid = false;
  } else if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
    errors.photo = 'Only JPEG/JPG allowed';
    valid = false;
  } else if (file.size > 5 * 1024 * 1024) {
    errors.photo = 'Max photo size is 5MB';
    valid = false;
  }

  return { valid, errors };
}
