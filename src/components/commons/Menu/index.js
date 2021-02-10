import React from 'react';
import { Logo } from '../../../theme/Logo';
import { MenuWrapper } from './styles/MenuWrapper';
import { Button } from '../Button';
import Text from '../../foudantion/Text'

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
]

export default function Menu() {
    return (
        <MenuWrapper>
            <MenuWrapper.LeftSide>
                <Logo />
            </MenuWrapper.LeftSide>
            <MenuWrapper.Central>
                {links.map(link => {
                    return(
                        <li key={link.url}>
                            <Text variant='smallestException' tag='a' href={link.url}>
                                {link.texto}
                            </Text>
                        </li>
                    )
                })}
            </MenuWrapper.Central>
            <MenuWrapper.RightSide>
                <Button ghost variant ='secondary.main'>
                    Entrar
                </Button>
                <Button variant ='primary.main'>
                    Cadastrar
                </Button>
            </MenuWrapper.RightSide>
        </MenuWrapper>
    );
}