import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function SEO({ headTitle }) {
  const hasHeadTitle = Boolean(headTitle);
  const baseTitle = 'Instalura';
  const title = hasHeadTitle
    ? (`${headTitle} | ${baseTitle}`)
    : baseTitle;

  const description = 'Compartilhe momentos e conecte-se com amigos';
  const urlBase = 'https://instalura.guswillemann.vercel.app/';
  const image = `${urlBase}images/meta-img.png`;
  const imageAlt = 'Banner onde se lê: Instalura, Orgulhosamente criado durante o Bootcamp Alura JAM Stack';

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="icon" href="/images/favicon.svg" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urlBase} />
      <meta property="og:title" content={baseTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={urlBase} />
      <meta property="twitter:title" content={baseTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta property="twitter:image:alt" content={imageAlt} />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="628" />
    </Head>
  );
}

SEO.defaultProps = {
  headTitle: '',
};

SEO.propTypes = {
  headTitle: PropTypes.string,
};
