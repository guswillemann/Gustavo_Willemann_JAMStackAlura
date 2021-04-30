import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const WebsitePageContext = React.createContext({
  toggleModal: () => {},
  getCMSContent: (cmsKey) => cmsKey,
  modalProps: {},
});
