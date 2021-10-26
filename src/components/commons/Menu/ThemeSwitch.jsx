import React from 'react';
import styled from 'styled-components';
import nookies from 'nookies';
import { IconButton } from '../Button';
import useAppThemeContext, { INSTALURA_THEME_COOKIE } from '../../../theme/context/AppThemeContext';

const ThemeSwitchBtn = styled(IconButton)`
  background-color: ${({ theme }) => theme.colors.background.color};
  position: fixed;
  bottom: 70px;
  right: 10px;
`;

export default function ThemeSwitch() {
  const { themeMode, setThemeMode } = useAppThemeContext();

  function switchTheme() {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';

    setThemeMode(newTheme);
    nookies.set(null, INSTALURA_THEME_COOKIE, newTheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return (
    <ThemeSwitchBtn onClick={switchTheme}>
      <img src={`/icons/theme/${themeMode}/themeSwitch.svg`} alt="Troca de tema" />
    </ThemeSwitchBtn>
  );
}
