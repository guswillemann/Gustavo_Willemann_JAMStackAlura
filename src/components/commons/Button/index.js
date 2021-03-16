/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable func-names */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { TextStyleVariantsMap } from '../../foundation/Text';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import propToStyle from '../../../theme/utils/propToStyle';
import Link from '../Link';

const buttonGhost = css`
  color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  background-color: transparent;
`;

const buttonDefault = css`
  background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

const ButtonWrapper = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: ${({ theme }) => theme.transtion};
  border-radius: ${({ theme }) => theme.borderRadius};
  ${function (props) {
    if (props.ghost) {
      return buttonGhost;
    }

    return buttonDefault;
  }};
  &:hover, &:focus {
    opacity: .5;
  }

  ${breakpointsMedia({
    xs: css`
     ${TextStyleVariantsMap.smallestException};
    `,
    md: css`
     ${TextStyleVariantsMap.paragraph1};
    `,
  })};
  ${propToStyle('margin')}
  ${propToStyle('display')}
  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};
`;

export default function Button({ href, ...props }) {
  const isLink = Boolean(href);
  const componentTag = isLink ? Link : 'button';
  return (
    <ButtonWrapper as={componentTag} href={href} {...props} />
  );
}

Button.propTypes = {
  href: PropTypes.string,

};

Button.defaultProps = {
  href: undefined,
};
