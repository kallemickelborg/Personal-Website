import { NextPage } from 'next';
import Head from "next/head";
import Menu from "./components/menu";
import Layout from './components/layout';
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mick Kalle Mickelborg&apos;s Website</title>
        <meta name="description" content="Mick Kalle Mickelborg&apos;s personal website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="contentBlock">
          <p>Hi, I&apos;m <span className="boldFont">Mick Kalle Mickelborg</span>.</p>
          <p>I work in the intersection of machine learning, diplomacy and entrepreneurship in the field of Artificial Intelligence.</p>
          <p>I&apos;ve worked in a diplomatic context as an Innovation Advisor tasked with mapping out the technological advancements in Artificial Intelligence happening in Silicon Valley, particularly from Stanford University and University of California, Berkeley. I worked with government officials, university professors and industry experts to establish a discourse on the implications of development in Artificial Intelligence, particularly Deep Learning and AI Safety.</p>
          <p>My interests are in understanding new technologies and the implications they have on our life and the future, especially when it comes to aligning with human values through scalable oversight and mechanistic interpretability.</p>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
