/* React Imports */
import React, { useEffect, useRef, useState } from "react";

/* Routing and Hygraph Imports */
import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import parse from "html-react-parser";
import { Element } from "domhandler";

/* Packages and Component Imports */
import Head from "next/head";
import Link from "next/link";
import Layout from "pages/components/Layout";
import ScrambleLink from "pages/components/ScrambleLink";
import FadeInDown from "pages/components/FadeInDown";
import CustomImage from "pages/components/CustomImage";
import ProgressBar from "pages/components/ProgressBar";
import useIntersectionObserver from "pages/hooks/useIntersectionObserver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/* Styling Imports */
import styles from "styles/BlogPost.module.css";

const hygraph = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/clx0i646e050q07ulfamwqyq6/master",
  {
    headers: {
      Authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTc1MTE4MTAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x4MGk2NDZlMDUwcTA3dWxmYW13cXlxNi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiZDc5Y2RkYmUtMWM1Ni00Yzg4LTg0OTAtNDM0ZTJjNTJjYWU0IiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.odDpWS2v3st5zXv-BIN29d12mJ2Zb6PZ6FYnychK8CjKJVlJEYBgCnVlJt1srGJUHBm9WRQYKKl5k29FtC_E43wtB-QKZKXVwik_LPUZfkQEu8gceg7Ocfb8gHfcfcv_b-KsjEsPLvQth_NJBxQ0LAqIr4e3Jb-XHu3VvnG8Up9ol_8GOUGi_Own91NktMIMn70fMfy8cV6xCPPUpWSUUaikTfzr6Y0N2PnRYjal_1fpAr9QSdMsmeiy9RbGWwqo373aEtFkB5XfH9TxTiuJh8dQuGml9jwo6D2ysO_xeYWLl0JAe-GNAu6Ga_0QuzxJgEGv_41SvC3CNp9uv1w-AxyLHWqr4J2P8xFaSXFTmliVPQjs-ZB3Ady9GWqIOcX0lrQMDWzidNel14-XPXqwfxoQXeL_F3mGmXQR2XIP-5d8kOey3ECdnLpTl4V6bUMxiruOaKjpbouiuQP9nWMhsLhmQvQxXCCBUgnr1CBdvx_5zQ7JH3XlXQgKWjiSbLFKWgZQPJGXFwMhb6LvPTFF7LUm4pKioZgVytM5fD7YvYTP_0M8cA9530sD2n7BWI-HH0XIej340bWqaO1KqVHmNZnyTGp6NtHQWtNKjStJYKBWiqaN2K2WEfEECSMpKeMTFqSMgGxiPNztic8DATn4LbUnv_w4F6iH3AUWP6U_Tpw",
    },
  }
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
      coverImage {
        url
      }
    }
  }
`;

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
  coverImage: {
    url: string;
  };
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

      const headingsArray = Array.from(headingElements).map(
        (headingElement, index) => {
          const id = `heading-${index}`;
          headingElement.id = id;
          return {
            id,
            text: headingElement.textContent || "",
          };
        }
      );

      setHeadings(headingsArray);
    };

    extractHeadings();
  }, [post.content.html]);

  const activeHeading = useIntersectionObserver(
    headings.map((heading) => ({
      ...heading,
      ref: React.createRef<HTMLHeadingElement>(),
    }))
  );

  const headingRefs = headings.map((heading) => ({
    id: heading.text,
    ...heading,
    ref: React.createRef<HTMLHeadingElement>(),
  }));

  const options = {
    replace: (domNode: Element) => {
      if (domNode.name === "img") {
        return (
          <div className={styles.imageWrapper}>
            <CustomImage
              className={styles.blogImage}
              src={domNode.attribs.src}
              alt={domNode.attribs.alt || ""}
              layout="responsive"
            />
          </div>
        );
      }
      if (domNode.name === "a" && domNode.attribs.href) {
        return (
          <>
            <ScrambleLink
              text={(domNode.children[0] as unknown as Text).data}
              url={domNode.attribs.href}
            />
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={styles.linkIcon}
            />
          </>
        );
      }
      return undefined;
    },
  };

  return (
    <Layout>
      <Head>
        <title>{`${post.title} - mickelb.org`}</title>
        <meta
          name="description"
          content={post.content.html.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
        <meta
          name="keywords"
          content={`${post.title}, blog, ${post.author.name}, relevant, keywords`} //CHANGE THE KEYWORDS
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.content.html.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://mickelb.org/blog/${post.id}`}
        />
        {post.coverImage && (
          <meta property="og:image" content={post.coverImage.url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.content.html.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
        {post.coverImage && (
          <meta name="twitter:image" content={post.coverImage.url} />
        )}
        <link rel="canonical" href={`https://mickelb.org/blog/${post.id}`} />

        <script
          id="post-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.date,
              dateModified: post.date,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
              publisher: {
                "@type": "Organization",
                name: "mickelb.org",
                logo: {
                  "@type": "ImageObject",
                  url: "favicon.ico", //CHANGE THE LOGO
                },
              },
              description: post.content.html
                .replace(/<[^>]+>/g, "")
                .slice(0, 160),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://mickelb.org/blog/${post.id}`,
              },
              image: post.coverImage ? post.coverImage.url : undefined,
            }),
          }}
        />
      </Head>
      <main ref={contentRef} className={styles.mainContent}>
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
