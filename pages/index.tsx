/* Packages and Component Imports */
import { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image";
import Layout from "./components/Layout";
import ScrambleHeader from "./components/ScrambleHeader";
import ScrambleLink from "./components/ScrambleLink";
import ScrambleMedia from "./components/ScrambleMedia";
import ScrambleText from "./components/ScrambleText";
import FadeInDown from './components/FadeInDown';

/* Styling Imports */
import styles from "styles/Home.module.css";
import profilePicture from "images/profilepicture.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mickelborg</title>
        <meta name="description" content="Mick Kalle Mickelborg&apos;s personal website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <FadeInDown>
        <div className="row">
          <h1>mickelb.org</h1>
        </div>
        </FadeInDown>

      <FadeInDown>
        <div className="row">
          <div className="col-4">
            <div>
              <ScrambleHeader text="mick kalle mickelborg" />
              <ScrambleText text="sf startup founder. building agentic AI" />
              <ScrambleText text="kallemickelborg@gmail.com" />
              <div className={styles.profilePicture}>
                <Image src={profilePicture} className="img-fluid w-50" alt="Mick Kalle Mickelborg" />
              </div>
              <div>
                <ScrambleHeader text="LINKS" />
                <div>
                  <ScrambleMedia text="linkedin" url="https://www.linkedin.com/in/kalle-mickelborg/" />
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
                </div>
                <div>
                  <ScrambleMedia text="twitter" url="https://x.com/kallemickelborg" />
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
                </div>
                <div>
                  <ScrambleMedia text="instagram" url="https://www.instagram.com/kallemickelborg/" />
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <ScrambleHeader text="CURRENTLY" />
            <div className={styles.textBox}>
              <p>01 - STARTUPS</p>
              <div>
                <ScrambleLink text="WISDM" url="https://wisdm.webflow.io" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
            </div>
            <div className={styles.textBox}>
              <p>02 - ML PROJECTS</p>
              <div>
                <ScrambleLink text="Agentic language models to disseminate Adverse Political Perspectives on Contentious Topics" url="https://github.com/JonathanIsTheCoolest/WisdmNewsAPI" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
            </div>
          </div>
          <div className="col">
            <ScrambleHeader text="PAST" />
            <div className={styles.textBox}>
              <p>01 - ML PROJECTS</p>
              <div>
                <ScrambleLink text="Open Access Research Scraper & NER Model Fine-tuning for accurate text extraction" url="https://github.com/MuchoFunkable/Open-Access-Research-Scraper---NER-Fine-tuning" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
            </div>
            <div className={styles.textBox}>
              <p>02 - SWE PROJECTS</p>
              <div>
                <ScrambleLink text="Interactive Recursive Framework for organizational and business modelling" url="https://github.com/MuchoFunkable/Interactive-Framework-model" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
            </div>
            <div className={styles.textBox}>
              <p>03 - PANEL & JUDGING</p>
              <div>
                <ScrambleLink text="Innovation Strategy for University of Copenhagen
" url="https://samarbejde.ku.dk/innovation/dokumenter/UCPH_innovation_strategy.pdf" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
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
            <ScrambleHeader text="MEDIA" />
            <div className={styles.textBox}>
              <p>01 - INDUSTRY PUBLICATIONS</p>
              <div>
                <ScrambleLink text="Future of Entrepreneurship" url="https://siliconvalley.um.dk/insights/the-future-of-entrepreneurship" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
              <div>
                <ScrambleLink text="Future of Resilience" url="https://siliconvalley.um.dk/insights/future-of-resilience" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
            </div>
            <div className={styles.textBox}>
              <p>02 - PRESS EXPOSURE</p>
              <div>
                <ScrambleLink text="ITWatch" url="https://itwatch.dk/ITNyt/Profiler/article17044712.ece" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
              </div>
              <div>
                <ScrambleLink text="SuperWarm" url="https://medium.com/strtupboost/building-a-future-for-financial-education-a-conversation-with-wisdm-founder-mick-kalle-mickelborg-6243fc2db798" />
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.linkIcon}/>
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
