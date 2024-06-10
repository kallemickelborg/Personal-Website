/* Hygraph Component Imports */
import Link from "next/link";
import { GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { FC } from "react";

/* Packages and Component Imports */
import Head from "next/head";
import Image from "next/image";
import Layout from "pages/components/Layout";
import FadeInDown from "pages/components/FadeInDown";

/* Styling Imports */
import styles from "styles/Blog.module.css";

const hygraph = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/clx0i646e050q07ulfamwqyq6/master",
  {
    headers: {
      Authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTc1MTE4MTAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x4MGk2NDZlMDUwcTA3dWxmYW13cXlxNi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiZDc5Y2RkYmUtMWM1Ni00Yzg4LTg0OTAtNDM0ZTJjNTJjYWU0IiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.odDpWS2v3st5zXv-BIN29d12mJ2Zb6PZ6FYnychK8CjKJVlJEYBgCnVlJt1srGJUHBm9WRQYKKl5k29FtC_E43wtB-QKZKXVwik_LPUZfkQEu8gceg7Ocfb8gHfcfcv_b-KsjEsPLvQth_NJBxQ0LAqIr4e3Jb-XHu3VvnG8Up9ol_8GOUGi_Own91NktMIMn70fMfy8cV6xCPPUpWSUUaikTfzr6Y0N2PnRYjal_1fpAr9QSdMsmeiy9RbGWwqo373aEtFkB5XfH9TxTiuJh8dQuGml9jwo6D2ysO_xeYWLl0JAe-GNAu6Ga_0QuzxJgEGv_41SvC3CNp9uv1w-AxyLHWqr4J2P8xFaSXFTmliVPQjs-ZB3Ady9GWqIOcX0lrQMDWzidNel14-XPXqwfxoQXeL_F3mGmXQR2XIP-5d8kOey3ECdnLpTl4V6bUMxiruOaKjpbouiuQP9nWMhsLhmQvQxXCCBUgnr1CBdvx_5zQ7JH3XlXQgKWjiSbLFKWgZQPJGXFwMhb6LvPTFF7LUm4pKioZgVytM5fD7YvYTP_0M8cA9530sD2n7BWI-HH0XIej340bWqaO1KqVHmNZnyTGp6NtHQWtNKjStJYKBWiqaN2K2WEfEECSMpKeMTFqSMgGxiPNztic8DATn4LbUnv_w4F6iH3AUWP6U_Tpw",
    },
  }
);

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      coverImage {
        url
      }
      content {
        html
      }
      date
    }
  }
`;

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: {
    url: string;
  };
  content: {
    html: string;
  };
  date: string;
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
            <ul className={styles.postList}>
              {posts.map((post) => (
                <li key={post.id} className={styles.postCard}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.coverImage && (
                      <div className={styles.imageContainer}>
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          layout="fill"
                          className={styles.postImage}
                        />
                      </div>
                    )}
                    <div className={styles.postCardContent}>
                      <h2>{post.title}</h2>
                      <p>{`Published on: ${post.date}`}</p>
                      <p>
                      {post.content.html
                        .replace(/<[^>]+>/g, "")
                        .slice(0, 160)}
                        ...
                      </p>
                    </div>
                  </Link>
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