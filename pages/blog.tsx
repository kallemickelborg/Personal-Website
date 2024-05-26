/* Hygraph Component Imports */
import Link from "next/link";
import { GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { FC } from "react";

/* Packages and Component Imports */
import Head from "next/head";
import Layout from "pages/components/Layout";
import FadeInDown from "pages/components/FadeInDown";

const hygraph = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwkmzl50000001w6avqn62a8/master",
  {
    headers: {
      Authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTY1NTI0MjgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x3a216bDUwMDAwMDAxdzZhdnFuNjJhOC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiZmRhNDYwMGYtOTViNC00YWU3LTkxY2UtMWY4NDA1NjNjYWE3IiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.QisoMmutXMwrUXZz0PQqzIsuyaKPum4QAjaLXJ0Np7x2nHt8xwa4Ak_JI-wznfmzHixBdQqSSvZaOWOk_fTFBI-8Eam-g1SzCQ4RVRiuLboGm9SWM1-VkmZc_LE7w-ZigJxFJ7HkfMwY5RdWOz8uSV11dN4tacZtknOANp8Q6YLMdoajh031uDKZxaHXgMocycqOlLVnBtWvPSfA6acmaylDRhGKaLnfDYj9e7fw7FQneH9bJ8x9I1cBtMeP2mR6mh07JHwSJZKFRVCELfMWoKXdBMCXsnPoUgGP7N-k8SBpIuypFkKLgKjODLy11m5txVfRkTEimhIErbsC82rXN7qhfn5c4ii502ITJj88TFR4hvgDI506Faf8hxU4ZE9Ul3rOe2ORm4v41tlyQIqtlaC63eL3p3nbujAdMIr7oYQewuYurxsNqF6ICldUPNzHahJQCSp7rw4tyTdYgiOUyUtARlzkwVu_bdfm3RjFXrd8rUoo6ObcBZgD30RA8gnyQ-Wk49vDbYTiMCzcCTpBXpVc1wudA0YdjrVI4ZZi4Cunc4GnYtxlVrQLOSrEBzIcqMEhCRWq1-zh5rYkF71_S2Uy3R3zZCIqk0cEv65hzFvS7v22gwYyDVoj5QdCPPxCbuL0cpm8VEluR2buYz9kH9PiNY-bLbIlDmLB-R7uY24",
    },
  },
);

const QUERY = gql`
  {
    posts {
      id
      title
      slug
    }
  }
`;

interface Post {
  id: string;
  title: string;
  slug: string;
}

interface BlogProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const { posts } = await hygraph.request<{ posts: Post[] }>(QUERY);

  return {
    props: {
      posts,
    },
  };
};

const Blog: FC<BlogProps> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>mickelb.org - Blog</title>
      </Head>
      <main>
        <FadeInDown>
          <div className="row">
            <Link href="/">
              <h1>mickelb.org</h1>
            </Link>
          </div>
        </FadeInDown>
        <FadeInDown>
          <div>
            <h1>Blog Posts</h1>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeInDown>
      </main>
    </Layout>
  );
};

export default Blog;
