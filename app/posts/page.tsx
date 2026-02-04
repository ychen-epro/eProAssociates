import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";

export const revalidate = 300;

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Query ALL posts without filtering by locale
  let posts = await client.queries.postConnection({
    sort: "date",
    last: 1,
  });

  const allPosts = posts;
  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.postConnection({
      sort: "date",
      before: posts.data.postConnection.pageInfo.endCursor,
    });
    if (!posts.data.postConnection.edges) {
      break;
    }
    allPosts.data.postConnection.edges.push(
      ...posts.data.postConnection.edges.reverse(),
    );
  }

  // Filter posts by locale in JavaScript after fetching
  const filteredEdges = allPosts.data.postConnection.edges?.filter((edge) => {
    const filename = edge?.node?._sys?.filename;
    if (!filename) return false;
    return filename.startsWith(`${locale}/posts/`);
  });

  // Create a new object with filtered edges
  const filteredPosts = {
    ...allPosts,
    data: {
      ...allPosts.data,
      postConnection: {
        ...allPosts.data.postConnection,
        edges: filteredEdges,
      },
    },
  };

  return (
    <Layout rawPageData={filteredPosts.data}>
      <PostsClientPage {...filteredPosts} />
    </Layout>
  );
}
