"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", label: "EN", fullName: "English" },
  { code: "zh", label: "中文", fullName: "中文" },
];

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  // Extract current locale from pathname
  const currentLocale =
    locales.find((locale) => pathname.startsWith(`/${locale.code}`))?.code ||
    "en";

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Replace the locale in the pathname
    let newPath = pathname;

    // If current path starts with a locale, replace it
    const localePattern = new RegExp(
      `^/(${locales.map((l) => l.code).join("|")})`,
    );
    if (localePattern.test(pathname)) {
      newPath = pathname.replace(localePattern, `/${newLocale}`);
    } else {
      // If no locale in path, add it
      newPath = `/${newLocale}${pathname}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  const currentLocaleData = locales.find((l) => l.code === currentLocale);

  return (
    <div className="relative">
      {/* Desktop version - shows both languages side by side */}
      <div className="hidden lg:flex items-center gap-2">
        {locales.map((locale) => (
          <button
            key={locale.code}
            onClick={() => switchLanguage(locale.code)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentLocale === locale.code
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-accent-foreground hover:bg-muted"
            }`}
            aria-label={`Switch to ${locale.fullName}`}
          >
            {locale.label}
          </button>
        ))}
      </div>

      {/* Mobile version - dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-accent-foreground hover:bg-muted"
          aria-label="Change language"
        >
          <Globe className="size-4" />
          <span>{currentLocaleData?.label}</span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 z-20 w-32 rounded-md border bg-background shadow-lg">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => switchLanguage(locale.code)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                    currentLocale === locale.code
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {locale.fullName}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
