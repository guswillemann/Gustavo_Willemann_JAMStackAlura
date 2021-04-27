import PropTypes from 'prop-types';
import React from 'react';
import { Logo } from '../../../theme/Logo';
import FormSearch from '../../patterns/FormSearch';
import Text from '../../foundation/Text';
import Button from '../Button';
import MenuWrapper from './styles/MenuWrapper';

const links = [
  {
    texto: 'Home',
    url: '/',
  },
  {
    texto: 'Perguntas frequentes',
    url: '/faq',
  },
  {
    texto: 'Sobre',
    url: '/sobre',
  },
];

export default function Menu({ onRegisterClick, isProfilePage }) {
  if (isProfilePage) {
    return (
      <MenuWrapper>
        <MenuWrapper.LeftSide>
          <Logo />
        </MenuWrapper.LeftSide>
        <MenuWrapper.RightSide>
          <FormSearch />
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
              {link.texto}
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
  isProfilePage: PropTypes.bool,
};

Menu.defaultProps = {
  onRegisterClick: undefined,
  isProfilePage: false,
};
