import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../../../theme/utils/breakpointsMedia';

const AppMenuWrapper = styled.nav`
  font-family: 'Rubik', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 12px 28px;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  
  background-color: ${({ theme }) => theme.colors.background.color};

  ${breakpointsMedia({
    md: css`
      position: initial;
      border-radius: initial;
      justify-content: flex-start;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      padding: 27px 16px;
      max-width: 768px;
    `,
    lg: css`
      max-width: 1160px; 
    `,
    xl: css`
      max-width: 1222px;
    `,
  })}
`;

AppMenuWrapper.LeftSide = styled.div`
  padding: 0;
  margin: 0;
  display: none;
  ${breakpointsMedia({
    md: css`
      width: 131px;
      height: 32px;
      padding-right: 16px;
      display: initial;
    `,
  })}
`;

AppMenuWrapper.RightSide = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;

  ${breakpointsMedia({
    md: {
      justifyContent: 'flex-end',
    },
  })}
`;

export default AppMenuWrapper;
