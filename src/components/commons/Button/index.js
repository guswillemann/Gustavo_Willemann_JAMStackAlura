import styled, { css } from 'styled-components';
import get from 'lodash/get';

const buttonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    background-color: transparent;
`;
const buttonDefault = css`
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

export const Button = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    border-radius: ${({ theme }) => theme.transtion};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${function(props) {
        if(props.ghost) {
            return buttonGhost;
        }
        else {
            return buttonDefault;
        }
    }}
    &:hover, &:focus {
        opacity: .5;
    }
`;