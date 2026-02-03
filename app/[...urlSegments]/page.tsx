import React from "react";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./client-page";

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments?: string[] }>;
}) {
  const resolvedParams = await params;
  const segments = resolvedParams.urlSegments ?? [];

  if (segments.length === 0) {
    return notFound();
  }

  const locale = segments[0];
  const pagePath = segments.slice(1).join("/"); // e.g., "home"

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${locale}/pages/${pagePath}.mdx`,
    });
  } catch (error) {
    return notFound();
  }

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
