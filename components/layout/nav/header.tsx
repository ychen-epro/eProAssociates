"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings?.header;

  const [menuState, setMenuState] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const openDropdown = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(index);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 500);
  };

  // ⛑ Guard: if Tina data isn’t there yet, don’t render
  if (!header) return null;

  return (
    <header>
      <nav className="fixed z-20 w-full border-b bg-background/50 backdrop-blur-3xl">
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12">
              <Link href="/" aria-label="home" className="flex items-center">
                {header.logo && (
                  <img
                    src={header.logo}
                    alt={header.name ?? ""}
                    className="h-16 w-auto"
                  />
                )}
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>

              {/* Desktop Nav */}
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-xl">
                  {header.nav?.map((item, index) => (
                    <li
                      key={index}
                      className="relative"
                      onMouseEnter={() => openDropdown(index)}
                      onMouseLeave={closeDropdown}
                    >
                      <Link
                        href={item.href ?? "#"}
                        className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                        onClick={() =>
                          item.children?.length
                            ? openDropdown(index)
                            : undefined
                        }
                      >
                        {item.label}
                      </Link>

                      {item.children && item.children.length > 0 && (
                        <div
                          className={`absolute left-0 top-full mt-2 w-48 rounded-md border bg-background shadow-lg transition-opacity duration-200 ${
                            openIndex === index
                              ? "opacity-100"
                              : "pointer-events-none opacity-0"
                          }`}
                          onMouseEnter={() => openDropdown(index)}
                          onMouseLeave={closeDropdown}
                        >
                          {item.children.map((child, idx) => (
                            <Link
                              key={idx}
                              href={child.href ?? "#"}
                              className="block px-4 py-2 hover:bg-muted"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`mt-6 w-full lg:hidden ${
                menuState ? "block" : "hidden"
              }`}
            >
              <ul className="space-y-4">
                {header.nav?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href ?? "#"}
                      className="block text-muted-foreground hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>

                    {item.children && item.children.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={child.href ?? "#"}
                            className="block pl-4 text-sm text-muted-foreground hover:text-accent-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
