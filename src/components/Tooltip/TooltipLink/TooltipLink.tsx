import type { TooltipLinkProps } from './tooltipLinkProps.interface';

export function TooltipLink({ href, children }: TooltipLinkProps) {
  return (
    <div className="relative group max-w-[275px]">
      <a href={href} className="truncate hover:underline block">
        {children}
      </a>
      <span className="hidden sm:inline absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-4 py-[3px] rounded bg-black text-[var(--text-white-color)] text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
