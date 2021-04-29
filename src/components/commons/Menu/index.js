import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../../theme/Logo';
import FormSearch from '../../patterns/FormSearch';
import Text from '../../foundation/Text';
import Button from '../Button';
import MenuWrapper from './styles/MenuWrapper';

const links = [
  {
    text: 'Home',
    url: '/',
  },
  {
    text: 'Perguntas frequentes',
    url: '/faq',
  },
  {
    text: 'Sobre',
    url: '/sobre',
  },
];

const IconButton = styled(Button)`
  padding: 0;
  font-size: 0;
  background-color: transparent;
  margin-left: 35px;

  img {
    height: 30px;
  }
`;

const AvatarImage = styled.img`
  margin-left: 35px;
  border-radius: 50%;
`;

export default function Menu({ onRegisterClick, isAppPage }) {
  if (isAppPage) {
    return (
      <MenuWrapper>
        <MenuWrapper.LeftSide>
          <Logo />
        </MenuWrapper.LeftSide>
        <MenuWrapper.RightSide>
          <FormSearch />
          <IconButton><img src="/icons/postIcon.svg" alt="Post" /></IconButton>
          <IconButton><img src="/icons/home.svg" alt="Home" /></IconButton>
          <IconButton><img src="/icons/heart.svg" alt="Like" /></IconButton>
          <AvatarImage src="http://placehold.it/50x50" alt="Avatar" />
        </MenuWrapper.RightSide>
      </MenuWrapper>
    );
  }

  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo />
      </MenuWrapper.LeftSide>
      <MenuWrapper.Central>
        {links.map((link) => (
          <li key={link.url}>
            <Text variant="smallestException" tag="a" href={link.url}>
              {link.text}
            </Text>
          </li>
        ))}
      </MenuWrapper.Central>
      <MenuWrapper.RightSide>
        <Button ghost variant="secondary.main" href="/app/login">
          Entrar
        </Button>
        <Button variant="primary.main" onClick={onRegisterClick}>
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}

Menu.propTypes = {
  onRegisterClick: PropTypes.func,
  isAppPage: PropTypes.bool,
};

Menu.defaultProps = {
  onRegisterClick: undefined,
  isAppPage: false,
};
