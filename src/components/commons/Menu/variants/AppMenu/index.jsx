import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Box from '../../../../foundation/layout/Box';
import { Logo } from '../../../../../theme/Logo';
import breakpointsMedia from '../../../../../theme/utils/breakpointsMedia';
import FormSearch from '../../../../patterns/FormSearch';
import { IconButton } from '../../../Button';
import AppMenuWrapper from './styles/AppMenuWrapper';
import useWebsitePageContext from '../../../../wrappers/WebsitePage/context';
import NewPostForm from '../../../../patterns/NewPostForm';

const PostButton = styled(IconButton)`
  order: 3;

  img {
    height: 40px;
  }

  ${breakpointsMedia({
    md: {
      order: '1',
      img: { height: '32px' },
      marginLeft: '32px',
    },
  })}
`;

const HomeButton = styled(IconButton)`
  order: 1;
  ${breakpointsMedia({
    md: {
      order: '2',
      marginLeft: '32px',
    },
  })}
`;

const HeartButton = styled(IconButton)`
  order: 4;

  ${breakpointsMedia({
    md: {
      marginLeft: '32px',
    },
  })}
`;

const OpenSearchButton = styled(IconButton)`
  order: 2;
  ${breakpointsMedia({
    md: {
      display: 'none',
      marginLeft: '32px',
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
  const { toggleModal } = useWebsitePageContext();

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
          <PostButton
            name="newPostBtn"
            onClick={() => toggleModal(<NewPostForm />)}
          >
            <img src="/icons/postIcon.svg" alt="Post" />
          </PostButton>
          <OpenSearchButton><img src="/icons/search.svg" alt="Abrir pesquisa" /></OpenSearchButton>
          <HomeButton><img src="/icons/home.svg" alt="Home" /></HomeButton>
          <HeartButton><img src="/icons/heart.svg" alt="Like" /></HeartButton>
          <AvatarImage src="https://picsum.photos/200" alt="Avatar" />
        </AppMenuWrapper.RightSide>
      </AppMenuWrapper>
    </Box>
  );
}
