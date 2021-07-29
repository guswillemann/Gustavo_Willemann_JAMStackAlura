import { parseCookies } from 'nookies';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import commonTheme, { colorThemes } from '..';

const AppThemeContext = React.createContext();

export const INSTALURA_THEME_COOKIE = 'INSTALURA_THEME_COOKIE';

export function AppThemeProvider({ children, themeCookie }) {
  const [themeMode, setThemeMode] = useState(themeCookie || 'light');

  useEffect(() => { // theme hydration for Static Pages
    const hydrationThemeCookie = parseCookies()[INSTALURA_THEME_COOKIE];
    if (hydrationThemeCookie) setThemeMode(hydrationThemeCookie);
  }, []);

  return (
    <ThemeProvider
      theme={{
        currentActive: themeMode,
        colors: colorThemes[themeMode],
        ...commonTheme,
      }}
    >
      <AppThemeContext.Provider
        value={{
          themeMode,
          setThemeMode,
        }}
      >
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  themeCookie: PropTypes.string,
};

AppThemeProvider.defaultProps = {
  themeCookie: undefined,
};

export default function useAppThemeContext() {
  return useContext(AppThemeContext);
}
