import type { TooltipTextProps } from './tooltipText';

export function TooltipText({
  children,
  className = '',
  as: Component = 'span',
}: TooltipTextProps) {
  return (
    <div className="relative group max-w-[275px] mx-auto">
      <Component className={`truncate ${className}`}>{children}</Component>
      <span className="hidden sm:inline absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-4 py-[3px] rounded bg-[var(--text-black-color)] text-[var(--text-white-color)] text-base opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
