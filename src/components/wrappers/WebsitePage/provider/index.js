import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../../../../theme/GlobalStyle';
import { AppThemeProvider } from '../../../../theme/context/AppThemeContext';

export default function WebsiteGlobalProvider({ children, themeCookie }) {
  return (
    <AppThemeProvider themeCookie={themeCookie}>
      <GlobalStyle />
      {children}
    </AppThemeProvider>
  );
}

WebsiteGlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
  themeCookie: PropTypes.string,
};

WebsiteGlobalProvider.defaultProps = {
  themeCookie: undefined,
};
