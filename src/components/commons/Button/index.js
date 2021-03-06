import PropTypes from 'prop-types';
import React from 'react';
import ButtonWrapper from './styles';

export default function Button({
  id,
  children,
  variant,
  onClick,
  isDisabled,
}) {
  return (
    <ButtonWrapper
      id={id}
      onClick={onClick}
      variant={variant}
      disabled={isDisabled}
    >
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  id: undefined,
  onClick: undefined,
  variant: 'default',
  isDisabled: false,
};
