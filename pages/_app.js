/* eslint-disable react/jsx-props-no-spreading */
import NextApp from 'next/app';
import Head from 'next/head';
import React from 'react';
import ThemeSwitch from '../src/components/commons/Menu/ThemeSwitch';
import WebsiteGlobalProvider from '../src/components/wrappers/WebsitePage/provider';
import { INSTALURA_THEME_COOKIE } from '../src/theme/context/AppThemeContext';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps, themeCookie }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/instagram.min.css" />
      </Head>
      <WebsiteGlobalProvider themeCookie={themeCookie}>
        <Component {...pageProps} />
        <ThemeSwitch />
      </WebsiteGlobalProvider>
    </>
  );
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const themeCookie = appContext.ctx.req?.cookies?.[INSTALURA_THEME_COOKIE];

  return {
    ...appProps,
    themeCookie,
  };
};
