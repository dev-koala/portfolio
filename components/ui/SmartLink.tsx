import type { ReactNode } from "react";

type Props = {
  /** `null` means "placeholder": the link does not navigate and shows a toast instead. */
  href: string | null;
  /** Toast text for the placeholder case, e.g. "Résumé file not linked yet". */
  placeholder: string;
  className?: string;
  children: ReactNode;
};

/**
 * Link that tolerates a missing URL. External http(s) links open in a new tab;
 * mailto: and in-page links are left alone. Placeholder clicks are handled by
 * components/Toast.tsx via the `data-ph` attribute.
 */
export function SmartLink({ href, placeholder, className, children }: Props) {
  if (!href) {
    return (
      <a href="#" className={className} data-ph={placeholder}>
        {children}
      </a>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
