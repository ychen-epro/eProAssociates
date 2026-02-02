"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer: React.FC = () => {
  const { globalSettings } = useLayout();

  const header = globalSettings?.header;
  const footer = globalSettings?.footer;

  if (!header || !footer) return null;

  const parentColor = header.color ?? "#000";

  return (
    <footer className="bg-white dark:bg-transparent border-t pt-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer Grid */}
        <div className="grid gap-10 md:grid-cols-4 pb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="Go home"
              className="inline-flex items-center"
            >
              {header.logo ? (
                <img
                  src={header.logo}
                  alt={header.name ?? "ePro Associates"}
                  className="h-14 w-auto"
                />
              ) : header.icon ? (
                <Icon parentColor={parentColor} data={header.icon} />
              ) : null}
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
          {footer.columns?.map((column, i) => {
            if (!column) return null;

            return (
              <div key={i}>
                {column.title && (
                  <h4 className="mb-4 text-sm font-semibold">{column.title}</h4>
                )}

                <ul className="space-y-2 text-sm text-muted-foreground">
                  {column.links?.map((link, idx) => {
                    if (!link || !link.label || !link.href) return null;

                    return (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* Social Links */}
          {footer.social && footer.social.length > 0 ? (
            <div>
              <h4 className="mb-4 text-sm font-semibold">Connect</h4>
              <div className="flex gap-4">
                {footer.social.map((link, index) => {
                  if (!link || !link.url || !link.icon) return null;

                  return (
                    <Link
                      key={`${link.icon.name ?? "icon"}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.icon.name ?? "Social link"}
                    >
                      <Icon
                        parentColor={parentColor}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data={{
                          ...link.icon,
                          size: "small", // UI-only prop
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 text-sm text-muted-foreground md:flex md:justify-between md:text-left">
          <p>
            {footer.copyright ??
              `© ${new Date().getFullYear()}, ePro Associates. All Rights Reserved`}
          </p>

          <p className="mt-2 md:mt-0">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
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
