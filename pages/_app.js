/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import GlobalStyle from '../src/theme/GloboStyle';
import theme from '../src/theme';
import SEO from '../src/components/commons/SEO';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </Head>
      <SEO headTitle="Home" />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
