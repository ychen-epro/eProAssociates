import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export default async function Home() {
  // Hardcode locale and page
  const locale = "en";
  const pagePath = "home"; // content/en/pages/home.mdx

  const data = await client.queries.page({
    relativePath: `${locale}/pages/${pagePath}.mdx`,
  });

  return (
    <Layout
      rawPageData={{
        ...data,
        variables: { relativePath: `${locale}/pages/${pagePath}.mdx` },
      }}
    >
      <ClientPage {...data} />
    </Layout>
  );
}
