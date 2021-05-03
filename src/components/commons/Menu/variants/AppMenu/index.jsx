import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Box from '../../../../foundation/layout/Box';
import { Logo } from '../../../../../theme/Logo';
import breakpointsMedia from '../../../../../theme/utils/breakpointsMedia';
import FormSearch from '../../../../patterns/FormSearch';
import Button from '../../../Button';
import AppMenuWrapper from './styles/AppMenuWrapper';

const IconButton = styled(Button)`
  padding: 0;
  font-size: 0;
  background-color: transparent;
  
  ${breakpointsMedia({
    md: {
      marginLeft: '32px',
    },
  })}
  

  img {
    height: 32px;
  }
`;

const PostButton = styled(IconButton)`
  order: 3;

  img {
    height: 40px;
  }

    ${breakpointsMedia({
    md: {
      order: '1',
      img: { height: '32px' },
    },
  })}
`;

const HomeButton = styled(IconButton)`
  order: 1;
  ${breakpointsMedia({
    md: {
      order: '2',
    },
  })}
`;

const HeartButton = styled(IconButton)`
  order: 4;
`;

const OpenSearchButton = styled(IconButton)`
  order: 2;
  ${breakpointsMedia({
    md: {
      display: 'none',
    },
  })}
`;

const AvatarImage = styled.img`
  order: 5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary.main.color};
  ${breakpointsMedia({
    md: {
      marginLeft: '32px',
    },
  })}
`;

export default function AppMenu() {
  const theme = useContext(ThemeContext);

  return (
    <Box
      backgroundColor={theme.colors.background.light.color}
    >
      <AppMenuWrapper>
        <AppMenuWrapper.LeftSide>
          <Logo />
        </AppMenuWrapper.LeftSide>
        <AppMenuWrapper.RightSide>
          <FormSearch />
          <PostButton><img src="/icons/postIcon.svg" alt="Post" /></PostButton>
          <OpenSearchButton><img src="/icons/search.svg" alt="Abrir pesquisa" /></OpenSearchButton>
          <HomeButton><img src="/icons/home.svg" alt="Home" /></HomeButton>
          <HeartButton><img src="/icons/heart.svg" alt="Like" /></HeartButton>
          <AvatarImage src="https://picsum.photos/200" alt="Avatar" />
        </AppMenuWrapper.RightSide>
      </AppMenuWrapper>
    </Box>
  );
}
