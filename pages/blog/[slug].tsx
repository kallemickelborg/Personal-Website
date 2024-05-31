import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { FC, useEffect, useState } from "react";
import parse, { domToReact, DOMNode } from "html-react-parser";
import { Element } from "domhandler";

/* Packages and Component Imports */
import Head from "next/head";
import Link from "next/link";
import Layout from "pages/components/Layout";
import FadeInDown from "pages/components/FadeInDown";
import CustomImage from 'pages/components/CustomImage';
import ScrollNavigation from "pages/components/ScrollNavigation";

/* Styling Imports */
import styles from "styles/BlogPost.module.css";

const hygraph = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwkmzl50000001w6avqn62a8/master",
  {
    headers: {
      Authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTY1NTI0MjgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x3a216bDUwMDAwMDAxdzZhdnFuNjJhOC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiZmRhNDYwMGYtOTViNC00YWU3LTkxY2UtMWY4NDA1NjNjYWE3IiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.QisoMmutXMwrUXZz0PQqzIsuyaKPum4QAjaLXJ0Np7x2nHt8xwa4Ak_JI-wznfmzHixBdQqSSvZaOWOk_fTFBI-8Eam-g1SzCQ4RVRiuLboGm9SWM1-VkmZc_LE7w-ZigJxFJ7HkfMwY5RdWOz8uSV11dN4tacZtknOANp8Q6YLMdoajh031uDKZxaHXgMocycqOlLVnBtWvPSfA6acmaylDRhGKaLnfDYj9e7fw7FQneH9bJ8x9I1cBtMeP2mR6mh07JHwSJZKFRVCELfMWoKXdBMCXsnPoUgGP7N-k8SBpIuypFkKLgKjODLy11m5txVfRkTEimhIErbsC82rXN7qhfn5c4ii502ITJj88TFR4hvgDI506Faf8hxU4ZE9Ul3rOe2ORm4v41tlyQIqtlaC63eL3p3nbujAdMIr7oYQewuYurxsNqF6ICldUPNzHahJQCSp7rw4tyTdYgiOUyUtARlzkwVu_bdfm3RjFXrd8rUoo6ObcBZgD30RA8gnyQ-Wk49vDbYTiMCzcCTpBXpVc1wudA0YdjrVI4ZZi4Cunc4GnYtxlVrQLOSrEBzIcqMEhCRWq1-zh5rYkF71_S2Uy3R3zZCIqk0cEv65hzFvS7v22gwYyDVoj5QdCPPxCbuL0cpm8VEluR2buYz9kH9PiNY-bLbIlDmLB-R7uY24",
    },
  },
);

const POST_QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      date
      author {
        name
      }
      content {
        html
      }
    }
  }
`;

interface PostContent {
  html: string;
}

interface Post {
  id: string;
  title: string;
  date: string;
  author: {
    name: string;
  };
  content: PostContent;
}

interface PostProps {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const QUERY = gql`
    {
      posts {
        slug
      }
    }
  `;
  const { posts } = await hygraph.request<{ posts: { slug: string }[] }>(QUERY);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { slug } = params as { slug: string };

  console.log('Fetching post with slug:', slug);

  const { post } = await hygraph
    .request<{ post: Post }>(POST_QUERY, { slug })
    .catch((error) => {
      console.error('Error fetching post:', error);
      throw new Error('Error fetching post');
    });

  if (!post) {
    console.error('No post found for slug:', slug);
    return {
      notFound: true,
    };
  }

  console.log('Fetched post:', post);

  return {
    props: {
      post,
    },
  };
};

const PostPage: FC<PostProps> = ({ post }) => {
  const headings: { id: string; text: string }[] = [];

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === "tag") {
        const element = domNode as Element;
        const { name, attribs, children } = element;
        if (name === "h2") {
          const id = attribs.id || children[0]?.data;
          headings.push({ id, text: children[0]?.data });
          return (
            <h2 id={id} className={styles.blogHeading2}>
              {domToReact(children as DOMNode[], options)}
            </h2>
          );
        }
        if (name === "p") {
          return (
            <p className={styles.blogP}>
              {domToReact(children as DOMNode[], options)}
            </p>
          );
        }
        if (name === "a") {
          return (
            <a className={styles.customLink} href={attribs.href}>
              {domToReact(children as DOMNode[], options)}
            </a>
          );
        }
        if (name === "img") {
          return (
            <div className={styles.imageWrapper}>
              <CustomImage
                className={styles.blogImage}
                src={attribs.src}
                alt={attribs.alt || ""}
                layout="responsive"
                width={600} // Adjust based on your requirements
                height={400} // Adjust based on your requirements
              />
            </div>
          );
        }
      }
    },
  };

  return (
    <Layout>
      <Head>
        <title>mickelb.org - {post.title}</title>
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
          <div className={styles.blogWrapper}>
            <div className={styles.blogContainer}>
              <div>
                <h1 className={styles.blogTitle}>{post.title}</h1>
                <p>
                  {post.date} | {post.author.name}
                </p>
                <hr className={styles.divider} />
              </div>
              <div>{parse(post.content.html, options)}</div>
            </div>
          </div>
        </FadeInDown>
        <ScrollNavigation headings={headings} />
      </main>
    </Layout>
  );
};

export default PostPage;