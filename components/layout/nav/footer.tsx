"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer, theme } = globalSettings!;

  if (!header || !footer) return null;

  return (
    <footer className="bg-white pt-20 dark:bg-transparent border-t">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer Grid */}
        <div className="grid gap-10 pb-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="go home"
              className="inline-flex items-center"
            >
              {header.logo ? (
                <img
                  src={header.logo}
                  alt={header.name ?? "ePro Associates"}
                  className="h-14 w-auto"
                />
              ) : (
                <Icon
                  parentColor={header.color!}
                  theme={theme}
                  data={header.icon}
                />
              )}
            </Link>

            <div className="text-sm text-muted-foreground space-y-1">
              {footer.phone && <p>{footer.phone}</p>}
              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="block hover:text-primary transition-colors"
                >
                  {footer.email}
                </a>
              )}
            </div>
          </div>

          {/* Footer Columns */}
          {footer.columns?.map((column, i) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold">{column.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.links?.map(
                  (link, idx) =>
                    link?.label &&
                    link?.href && (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          {footer.social?.length ? (
            <div>
              <h4 className="mb-4 text-sm font-semibold">Connect</h4>
              <div className="flex gap-4">
                {footer.social.map(
                  (link, index) =>
                    link?.url &&
                    link?.icon && (
                      <Link
                        key={`${link.icon.name ?? "icon"}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          data={{ ...link.icon, size: "small" }}
                          parentColor={header.color!}
                          theme={theme}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        />
                      </Link>
                    ),
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 text-center text-sm text-muted-foreground md:flex md:justify-between md:text-left">
          <p>
            {footer.copyright ??
              `© ${new Date().getFullYear()}, ePro Associates. All Rights Reserved`}
          </p>
          <p className="mt-2 md:mt-0">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>{" "}
            &nbsp;|&nbsp;
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
