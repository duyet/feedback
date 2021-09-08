import Head from "next/head";
import type { NextPage } from "next";
import { ChakraProvider, Heading } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";
import Testimonials from "../components/Testimonials";

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <div className={styles.container}>
        <Head>
          <title>Fossil Internal Feedback System</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Fossil <a href="#">Feedback System</a>
          </h1>

          <p className={styles.description}>
            Collect issues, ideas and compliments with a simple widget.
          </p>

          <div className={styles.grid}>
            <a href="/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Learn how to add cit-feedback to React internal tool.</p>
            </a>

            <a href="/dashboard" className={styles.card}>
              <h2>Dashboard &rarr;</h2>
              <p>Dive deep with the dashboard to see the feedbacks.</p>
            </a>
          </div>

          <div>
            <Testimonials />
          </div>

          <div className={styles.integrate}>
            <Heading>How-to Integrate</Heading>
            <div className={styles.blockcode}>
              <pre>
                {"// React\n"}
                {"import { FeedbackForm } from '@cloud/feedback'\n"}
                {"<FeedbackForm user={email} />\n"}
              </pre>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>Powered by Cloud Team</footer>
      </div>
    </ChakraProvider>
  );
};

export default Home;
