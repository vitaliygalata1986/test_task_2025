import clsx from 'clsx';
import type { HeadingProps } from './Headling.props';

function Heading({ tag = 'h1', children, className, ...props }: HeadingProps) {
  const Tag = tag;

  return (
    <Tag
      className={clsx(
        'text-[40px] leading-10 tracking-normal text-[var(--text-black-color)] text-center',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Heading;
