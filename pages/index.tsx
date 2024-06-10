/* Routing and Hygraph Imports */
import { GetStaticProps, NextPage } from "next";
import { GraphQLClient, gql } from "graphql-request";

/* Packages and Component Imports */
import Head from "next/head";
import Image from "next/image";
import Layout from "./components/Layout";
import ScrambleHeader from "./components/ScrambleHeader";
import ScrambleLink from "./components/ScrambleLink";
import ScrambleMedia from "./components/ScrambleMedia";
import ScrambleText from "./components/ScrambleText";
import FadeInDown from "./components/FadeInDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/* Styling Imports */
import styles from "styles/Home.module.css";
import profilePicture from "images/profilepicture.jpg";

/* Type Definitions */
interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: {
    url: string;
  };
  date: string;
}

const hygraph = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/clx0i646e050q07ulfamwqyq6/master",
  {
    headers: {
      Authorization:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTc1MTE4MTAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x4MGk2NDZlMDUwcTA3dWxmYW13cXlxNi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiZDc5Y2RkYmUtMWM1Ni00Yzg4LTg0OTAtNDM0ZTJjNTJjYWU0IiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.odDpWS2v3st5zXv-BIN29d12mJ2Zb6PZ6FYnychK8CjKJVlJEYBgCnVlJt1srGJUHBm9WRQYKKl5k29FtC_E43wtB-QKZKXVwik_LPUZfkQEu8gceg7Ocfb8gHfcfcv_b-KsjEsPLvQth_NJBxQ0LAqIr4e3Jb-XHu3VvnG8Up9ol_8GOUGi_Own91NktMIMn70fMfy8cV6xCPPUpWSUUaikTfzr6Y0N2PnRYjal_1fpAr9QSdMsmeiy9RbGWwqo373aEtFkB5XfH9TxTiuJh8dQuGml9jwo6D2ysO_xeYWLl0JAe-GNAu6Ga_0QuzxJgEGv_41SvC3CNp9uv1w-AxyLHWqr4J2P8xFaSXFTmliVPQjs-ZB3Ady9GWqIOcX0lrQMDWzidNel14-XPXqwfxoQXeL_F3mGmXQR2XIP-5d8kOey3ECdnLpTl4V6bUMxiruOaKjpbouiuQP9nWMhsLhmQvQxXCCBUgnr1CBdvx_5zQ7JH3XlXQgKWjiSbLFKWgZQPJGXFwMhb6LvPTFF7LUm4pKioZgVytM5fD7YvYTP_0M8cA9530sD2n7BWI-HH0XIej340bWqaO1KqVHmNZnyTGp6NtHQWtNKjStJYKBWiqaN2K2WEfEECSMpKeMTFqSMgGxiPNztic8DATn4LbUnv_w4F6iH3AUWP6U_Tpw",
    },
  }
);

const RECENT_POST_QUERY = gql`
{
  posts(first: 1, orderBy: date_DESC) {
    id
    title
    slug
    coverImage {
      url
    }
    date
  }
}
`;

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await hygraph.request<{ posts: Post[] }>(RECENT_POST_QUERY);
  return {
    props: {
      recentPost: posts[0],
    },
  };
};

const Home: NextPage<{ recentPost: Post }> = ({ recentPost }) => {
  return (
    <Layout>
      <Head>
        <title>mickelb.org</title>
        <meta
          name="description"
          content="Mick Kalle Mickelborg is a SF startup founder and developer in the field of machine learning and AI. He has been recognized by universities, diplomacy, and press alike for his work in the field of AI and entrepreneurship."
        />
        <meta
          name="keywords"
          content="Mick Kalle Mickelborg, SF startup founder, machine learning, deep learning, artificial intelligence, agentic AI, AI development, AI applications, AI safety, AI ethics, AI research, entrepreneurship, startup ecosystem"
        />
        <meta name="author" content="Mick Kalle Mickelborg" />
        <meta property="og:title" content="Mick Kalle Mickelborg" />
        <meta property="og:description" content="Mick Kalle Mickelborg is a SF startup founder and developer in the field of machine learning and AI. He has been recognized by universities, diplomacy, and press alike for his work in the field of AI and entrepreneurship." />
        <meta property="og:image" content="/images/profilepicture.jpg" />
        <meta property="og:url" content="https://mickelb.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mick Kalle Mickelborg" />
        <meta name="twitter:description" content="Mick Kalle Mickelborg is a SF startup founder and developer in the field of machine learning and AI. He has been recognized by universities, diplomacy, and press alike for his work in the field of AI and entrepreneurship." />
        <meta name="twitter:image" content="/images/profilepicture.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FadeInDown>
          <div className="row">
            <h1 className={styles.title}>mickelb.org</h1>
          </div>
        </FadeInDown>

        <FadeInDown>
          <div className="row">
            <div className="col-4">
              <div>
                <ScrambleHeader text="Mick Kalle Mickelborg" />
                <ScrambleText text="sf startup founder. building agentic AI" />
                <ScrambleText text="kallemickelborg@gmail.com" />
                <div className={styles.profilePicture}>
                  <Image
                    src={profilePicture}
                    className="img-fluid w-50"
                    alt="Mick Kalle Mickelborg"
                  />
                </div>
                {recentPost && (
                  <div className={styles.recentPostLink}>
                    <h2>recent blogpost</h2>
                    <ScrambleLink text={recentPost.title + ", " + recentPost.date} url={`/blog/${recentPost.slug}`} />
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className={styles.linkIcon}
                    />
                  </div>
                )}
                <div>
                  <ScrambleHeader text="links" />
                  <div>
                    <ScrambleMedia
                      text="linkedin"
                      url="https://www.linkedin.com/in/kalle-mickelborg/"
                    />
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className={styles.linkIcon}
                    />
                  </div>
                  <div>
                    <ScrambleMedia
                      text="twitter"
                      url="https://x.com/kallemickelborg"
                    />
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className={styles.linkIcon}
                    />
                  </div>
                  <div>
                    <ScrambleMedia
                      text="instagram"
                      url="https://www.instagram.com/kallemickelborg/"
                    />
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className={styles.linkIcon}
                    />
                  </div>
                  <div>
                    <ScrambleMedia text="blog" url="/blog" />
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className={styles.linkIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <ScrambleHeader text="currently" />
              <div className={styles.textBox}>
                <p>01 - STARTUPS</p>
                <div>
                  <ScrambleLink text="WISDM" url="https://wisdm.webflow.io" />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>02 - ML PROJECTS</p>
                <div>
                  <ScrambleLink
                    text="Agentic language model to disseminate Adverse Political Perspectives on Contentious Topics"
                    url="https://github.com/JonathanIsTheCoolest/WisdmNewsAPI"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <ScrambleHeader text="past" />
              <div className={styles.textBox}>
                <p>01 - ML PROJECTS</p>
                <div>
                  <ScrambleLink
                    text="Open Access Research Scraper & NER Model Fine-tuning for accurate text extraction"
                    url="https://github.com/MuchoFunkable/Open-Access-Research-Scraper---NER-Fine-tuning"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>02 - SWE PROJECTS</p>
                <div>
                  <ScrambleLink
                    text="Interactive Recursive Framework for organizational and business modelling"
                    url="https://github.com/MuchoFunkable/Interactive-Framework-model"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>03 - PANEL & JUDGING</p>
                <div>
                  <ScrambleLink
                    text="Innovation Strategy for University of Copenhagen
"
                    url="https://samarbejde.ku.dk/innovation/dokumenter/UCPH_innovation_strategy.pdf"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>04 - EDUCATION</p>
                <div>
                  <ScrambleText text="University of California, Berkeley" />
                  <ScrambleText text="Copenhagen Business School" />
                  <ScrambleText text="Aalborg University" />
                </div>
              </div>
            </div>
            <div className="col">
              <ScrambleHeader text="media" />
              <div className={styles.textBox}>
                <p>01 - INDUSTRY PUBLICATIONS</p>
                <div>
                  <ScrambleLink
                    text="Future of Entrepreneurship"
                    url="https://siliconvalley.um.dk/insights/the-future-of-entrepreneurship"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
                <div>
                  <ScrambleLink
                    text="Future of Resilience"
                    url="https://siliconvalley.um.dk/insights/future-of-resilience"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>02 - PRESS EXPOSURE</p>
                <div>
                  <ScrambleLink
                    text="ITWatch"
                    url="https://itwatch.dk/ITNyt/Profiler/article17044712.ece"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
                <div>
                  <ScrambleLink
                    text="SuperWarm"
                    url="https://medium.com/strtupboost/building-a-future-for-financial-education-a-conversation-with-wisdm-founder-mick-kalle-mickelborg-6243fc2db798"
                  />
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className={styles.linkIcon}
                  />
                </div>
              </div>
              <div className={styles.textBox}>
                <p>03 - WORKSHOPS & PRESENTATIONS</p>
                <ScrambleText text="Presented about the societal and ethical implications of AI for universities and startups alike, for a private delegation with the Danish Minister of Digitalization and Gender Equality, Marie Bjerre. UC Berkeley, CITRIS and The Banatao Institute" />
              </div>
            </div>
          </div>
        </FadeInDown>
      </main>
    </Layout>
  );
};

export default Home;
