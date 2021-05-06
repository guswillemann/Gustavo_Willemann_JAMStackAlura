import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';

const NewPostWrapper = styled.section`
  position: relative;
  overflow-y: scroll;

  width: 375px;
  max-width: 100vw;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${breakpointsMedia({
    md: css`
      overflow-y: initial;
    `,
  })}

  align-self: center;
  background-color: ${({ theme }) => theme.colors.background.light.color};
  padding: 56px 0 32px 0;

  form {
    position: relative;
    margin-top: 48px;
    padding-right: 24px;
    padding-left: 24px;

    button {
      font-size: 0;
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 24px;
      padding: 12px;
    }
    
    p {
      color: ${({ theme }) => theme.colors.tertiary.light.color}
    }
  }
`;

export default NewPostWrapper;
