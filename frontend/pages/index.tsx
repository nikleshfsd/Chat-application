import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import LandingPage from '../containers/LandingPage';
import styles from '../styles/LandingPage.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </div>
  );
};

export default Home;
