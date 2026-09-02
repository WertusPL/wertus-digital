import Link from "next/link";
import { cn } from "@/lib/utils";

/** Secondary link — underline wipes in, arrow slides on hover. */
export function ArrowLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-medium text-ink",
        className,
      )}
    >
      <span className="relative">
        {label}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
