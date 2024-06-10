/* React Imports */
import { FC } from "react";

/* Routing and Hygraph Imports */
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { GraphQLClient, gql } from "graphql-request";

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
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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
      author {
        name
      }
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
  author: {
    name: string;
  };
}

interface PostProps {
  post: Post;
}

const PostPage: FC<PostProps> = ({ post }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "description": post.content.html.replace(/<[^>]+>/g, '').slice(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mickelb.org/blog/${post.id}`,
    },
    "image": post.coverImage ? post.coverImage.url : undefined,
  };

  return (
    <Layout>
      <Head>
        <title>{`${post.title} - mickelb.org`}</title>
        <meta name="description" content={post.content.html.replace(/<[^>]+>/g, '').slice(0, 160)} />
        <meta name="keywords" content={`${post.title}, blog, ${post.author.name}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.html.replace(/<[^>]+>/g, '').slice(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mickelb.org/blog/${post.id}`} />
        {post.coverImage && <meta property="og:image" content={post.coverImage.url} />}
        <link rel="canonical" href={`https://mickelb.org/blog/${post.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      <main className={styles.mainContent}>
        <FadeInDown>
          <div className="row">
            <Link href="/" className={styles.blogHeaderLink}>
              <h1 className={styles.blogHeaderLink}>mickelb.org</h1>
            </Link>
          </div>
        </FadeInDown>
        <FadeInDown>
          <div className={styles.blogWrapper}>
            <div className={styles.blogContainer}>
              <div>
                <h1 className={styles.blogTitle}>{post.title}</h1>
                <p>{`${post.date} | ${post.author.name}`}</p>
                <hr className={styles.divider} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
            </div>
          </div>
        </FadeInDown>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await hygraph.request<{ posts: Post[] }>(gql`
    {
      posts {
        slug
      }
    }
  `);

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { post } = await hygraph.request<{ post: Post }>(QUERY, {
    slug: params?.slug,
  });

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
