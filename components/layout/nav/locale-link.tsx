"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LocaleLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
}

export const LocaleLink: React.FC<LocaleLinkProps> = ({ href, ...props }) => {
  const pathname = usePathname();

  // Extract current locale from pathname
  const locales = ["en", "zh"];
  const currentLocale =
    locales.find((locale) => pathname.startsWith(`/${locale}`)) || "en";

  // If href already has a locale or is external, use as-is
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const hasLocale = locales.some((locale) => href.startsWith(`/${locale}`));

  const localizedHref =
    isExternal || hasLocale
      ? href
      : `/${currentLocale}${href.startsWith("/") ? href : `/${href}`}`;

  return <Link href={localizedHref} {...props} />;
};
