import React from 'react';
import { Logo } from '../../../theme/Logo';
import { MenuWrapper } from './styles/MenuWrapper';

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
                    <li>
                        <a href={link.url}>
                            {link.texto}
                        </a>
                    </li>
                )
            })}
        </MenuWrapper.Central>
        <MenuWrapper.RightSide>
            <button>
                Entrar
            </button>
            <button>
                Cadastrar
            </button>
        </MenuWrapper.RightSide>
        </MenuWrapper>
    );
}