import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  // Hardcode locale for now
  const locale = "en";

  // The collection path is "content", so relativePath should be "en/global/index.json"
  const { data: globalData } = await client.queries.global(
    { relativePath: `${locale}/global/index.json` },
    {
      fetchOptions: { next: { revalidate: 60 } },
    },
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden pt-20">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}
