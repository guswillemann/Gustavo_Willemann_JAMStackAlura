import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const WebsitePageContext = React.createContext();

export function WebsitePageContextProvider({ children, messages }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const modalProps = {
    'data-modal-safe-area': 'true',
  };

  function toggleModal(modalVariant) {
    const hasModalContent = Boolean(modalVariant);
    if (hasModalContent) setModalContent(modalVariant);
    setModalOpen(!isModalOpen);
  }

  function getCMSContent(cmsKey) {
    return get(messages, cmsKey);
  }

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModal,
        getCMSContent,
        modalProps,
        modalContent,
        isModalOpen,
      }}
    >
      {children}
    </WebsitePageContext.Provider>
  );
}

WebsitePageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object,
};

WebsitePageContextProvider.defaultProps = {
  messages: {},
};

export default function useWebsitePageContext() {
  return useContext(WebsitePageContext);
}
