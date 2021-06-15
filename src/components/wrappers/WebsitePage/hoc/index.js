/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WebsitePageWrapper from '..';

export default function websitePageHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <WebsitePageWrapper
      {...pageWrapperProps}
      {...props.pageWrapperProps}
      messages={props.messages}
    >
      <PageComponent {...props} />
    </WebsitePageWrapper>
  );
}
