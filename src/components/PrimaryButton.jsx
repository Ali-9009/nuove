import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PrimaryButton({
  children,
  href = undefined,
  onClick = undefined,
  type = "button",
  arrow = false,
  className = "",
  disabled = false,
  ...props
}) {
  const styles = `
    group relative inline-flex min-h-[52px]
    items-center justify-center gap-3
    overflow-hidden
    bg-primary px-8 py-4
    font-sans text-[11px] font-semibold
    uppercase tracking-[0.16em] text-white
    transition-all duration-500 ease-out
    hover:shadow-[0_10px_30px_rgba(6,48,74,0.18)]
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-primary
    ${className}
  `;

  const content = (
    <>
      {/* Sliding flash effect */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-y-0 -left-[80%]
          w-[45%] -skew-x-[25deg]
          bg-gradient-to-r
          from-transparent via-white/30 to-transparent
          transition-[left] duration-700 ease-in-out
          group-hover:left-[140%]
          motion-reduce:transition-none
        "
      />

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Optional arrow */}
      {arrow && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className="
            relative z-10
            transition-transform duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            motion-reduce:transition-none
          "
        />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={styles} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles} disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
      {...props}
    >
      {content}
    </button>
  );
}