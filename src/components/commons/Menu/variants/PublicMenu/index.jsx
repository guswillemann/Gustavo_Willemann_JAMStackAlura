import React, { useContext } from 'react';
import { Logo } from '../../../../../theme/Logo';
import Text from '../../../../foundation/Text';
import { WebsitePageContext } from '../../../../wrappers/WebsitePage/context';
import Button from '../../../Button';
import PublicMenuWrapper from './styles/PublicMenuWrapper';
import FormRegister from '../../../../patterns/FormRegister';

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

export default function PublicMenu() {
  const { toggleModal } = useContext(WebsitePageContext);

  return (
    <PublicMenuWrapper>
      <PublicMenuWrapper.LeftSide>
        <Logo />
      </PublicMenuWrapper.LeftSide>
      <PublicMenuWrapper.Central>
        {links.map((link) => (
          <li key={link.url}>
            <Text variant="smallestException" tag="a" href={link.url}>
              {link.text}
            </Text>
          </li>
        ))}
      </PublicMenuWrapper.Central>
      <PublicMenuWrapper.RightSide>
        <Button ghost variant="secondary.main" href="/app/login">
          Entrar
        </Button>
        <Button variant="primary.main" onClick={() => toggleModal(<FormRegister />)}>
          Cadastrar
        </Button>
      </PublicMenuWrapper.RightSide>
    </PublicMenuWrapper>
  );
}
