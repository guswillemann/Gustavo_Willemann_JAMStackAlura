import React from 'react';
import styled from 'styled-components';
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
  return (
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
        <AvatarImage src="http://placehold.it/50x50" alt="Avatar" />
      </AppMenuWrapper.RightSide>
    </AppMenuWrapper>
  );
}
