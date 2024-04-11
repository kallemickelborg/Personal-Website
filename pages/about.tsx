import { NextPage } from 'next';
import Head from "next/head";
import Menu from "./components/menu";
import Layout from "./components/layout";
import styles from "styles/global.css";
import Image from "next/image";
import logoBerkeley from "images/berkeley_logo.svg";
import logoCBS from "images/cbs_logo.svg";
import logoAAU from "images/aau_logo.svg";
import logoBlueDot_small from "images/bluedotimpact_logo_small.jpeg";
import logoStanford_small from "images/stanford_logo_small.jpg";

const About: NextPage = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>About</title>
          <meta
            name="description"
            content="Information about Mick Kalle Mickelborg's education and work history, as well as extracurricular activities, certifications, and coursework."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <div className="contentBlock">
            {/*<div>
              <h2>Work Experience</h2>
              <div className="divider"></div>
            </div>*/}
            <div>
              <h2>Educational Background</h2>
              <div className="divider"></div>
              <div className="educationBlock">
                <div className="universityLogo">
                  <Image
                    src={logoCBS}
                    alt="University Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="educationText">
                  <h3>Copenhagen Business School</h3>
                  <h4>
                    Master&apos;s in Business Administration and E-business
                  </h4>
                  {/*<ul>
                    <li>Dimsekongen</li>
                  </ul>*/}
                </div>
              </div>
              <div className="educationBlock">
                <div className="universityLogo">
                  <Image
                    src={logoBerkeley}
                    alt="University Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="educationText">
                  <h3>University of California, Berkeley</h3>
                  <h4>Master&apos;s Program - SPARK Scholarship Recipient</h4>
                  {/*<ul>
                    <li>Dimsekongen</li>
                  </ul>*/}
                </div>
              </div>
              <div className="educationBlock">
                <div className="universityLogo">
                  <Image
                    src={logoAAU}
                    alt="University Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="educationText">
                  <h3>Aalborg University</h3>
                  <h4>Bachelor&apos;s in Computer Science</h4>
                  {/*<ul>
                    <li>Dimsekongen</li>
                  </ul>*/}
                </div>
              </div>
            </div>
            <div>
              <h2>Certifications & Coursework</h2>
              <div className="divider"></div>
              <div className="educationBlock">
                <div className="universityLogo">
                  <Image
                    src={logoBlueDot_small}
                    alt="University Logo"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="educationText">
                  <h3>BlueDot Impact</h3>
                  <h4>
                    <a href="https://aisafetyfundamentals.com/">
                      AI Safety Fundamentals: Alignment
                    </a>
                  </h4>
                </div>
              </div>
              <div className="educationBlock">
                <div className="universityLogo">
                  <Image
                    src={logoStanford_small}
                    alt="University Logo"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="educationText">
                  <h3>Stanford University</h3>
                  <h4>
                    Graphical Models: Uncovering Hidden Relationships in Complex
                    Systems through Bayesian Networks and Markov Chains
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default About;
