import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import parse from "html-react-parser";
import { Element } from "domhandler";

/* Packages and Component Imports */
import Head from "next/head";
import Link from "next/link";
import Layout from "pages/components/Layout";
import FadeInDown from "pages/components/FadeInDown";
import CustomImage from "pages/components/CustomImage";
import ProgressBar from "pages/components/ProgressBar";
import useIntersectionObserver from "pages/hooks/useIntersectionObserver";

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
    //   imageUrl
    // } ADD THIS INTO THE POST_QUERO AFTER html }

interface Post {
  id: string;
  title: string;
  date: string;
  author: {
    name: string;
  };
  content: {
    html: string;
  };
  // imageUrl: string;
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
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { post } = await hygraph.request<{ post: Post }>(POST_QUERY, { slug });
  return post ? { props: { post } } : { notFound: true };
};

const PostPage: React.FC<PostProps> = ({ post }) => {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const extractHeadings = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content.html, "text/html");
      const headingElements = doc.querySelectorAll("h2");

      const headingsArray = Array.from(headingElements).map((headingElement, index) => {
        const id = `heading-${index}`;
        headingElement.id = id;
        return {
          id,
          text: headingElement.textContent || "",
        };
      });

      setHeadings(headingsArray);
    };

    extractHeadings();
  }, [post.content.html]);

  const activeHeading = useIntersectionObserver(headings.map(heading => ({
    ...heading,
    ref: React.createRef<HTMLHeadingElement>(),
  })));

  const options = {
    replace: (domNode: Element) => {
      interface Heading {
        id: string;
        text: string;
        ref: React.RefObject<HTMLHeadingElement>;
      } useState<Heading[]>([]);

      if (domNode.name === "img") {
        return (
          <div className={styles.imageWrapper}>
            <CustomImage
              className={styles.blogImage}
              src={domNode.attribs.src}
              alt={domNode.attribs.alt || ""}
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        );
      }
    },
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
        {/* <meta property="og:image" content={post.imageUrl} /> */}
      </Head>
      <main ref={contentRef} className={styles.mainContent}>
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
            {/* <div className={styles.bannerImageWrapper}>
                <CustomImage
                  className={styles.bannerImage}
                  src={post.imageUrl}
                  alt={post.title}
                  layout="responsive"
                  width={1200}
                  height={600}
                />
              </div> */}
              <div>
                <h1 className={styles.blogTitle}>{post.title}</h1>
                <p>{`${post.date} | ${post.author.name}`}</p>
                <hr className={styles.divider} />
              </div>
              <div>{parse(post.content.html, options)}</div>
            </div>
          </div>
        </FadeInDown>
        <ProgressBar headings={headings} activeHeading={activeHeading} />
      </main>
    </Layout>
  );
};

export default PostPage;