import clsx from 'clsx';
import type { ButtonProps } from './Button.props';

function Button({ children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'w-[100px] h-[34px] px-[18px] py-1 rounded-[80px] text-base leading-[26px] transition-colors duration-300',
        disabled
          ? 'bg-[var(--disabled-btn-bg-color)] text-[var(--disabled-btn-text-color)] cursor-not-allowed'
          : 'bg-[var(--primary-color)] text-[var(--text-black-color)] hover:bg-[var(--btn-hover-bg-color)] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
