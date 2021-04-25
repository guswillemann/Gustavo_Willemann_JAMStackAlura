import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const WebsitePageContext = React.createContext({
  toggleModalCadastro: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});
