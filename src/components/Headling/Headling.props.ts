import type { ReactNode, HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
