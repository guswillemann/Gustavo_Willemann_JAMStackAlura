/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import propToStyle from '../../../../theme/utils/propToStyle';

function setColumnValue() {
  // eslint-disable-next-line func-names
  return function ({ value }) {
    if (value === undefined) return;
    if (typeof value === 'number') {
      return css`
        flex: 0 0 ${((100 * value) / 12).toFixed(4)}%;
        max-width: ${((100 * value) / 12).toFixed(4)}%;
    `;
    }
    return () => {
      const baseObject = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const element in value) {
        baseObject[element] = css`
          flex: 0 0 ${((100 * value[element]) / 12).toFixed(4)}%;
          max-width:${((100 * value[element]) / 12).toFixed(4)}%;
        `;
      }
      return breakpointsMedia(baseObject);
    };
  };
}

function setColumnOffset() {
  // eslint-disable-next-line func-names
  return function ({ offset }) {
    if (offset === undefined) return;
    if (typeof offset === 'number') {
      return css`
        margin-left: ${((100 * offset) / 12).toFixed(4)}%;
      `;
    }
    return () => {
      const baseObject = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const element in offset) {
        baseObject[element] = css`
          margin-left: ${((100 * offset[element]) / 12).toFixed(4)}%;
        `;
      }
      return breakpointsMedia(baseObject);
    };
  };
}

const gridContainerBreakpointsChanges = {
  sm: css`
    max-width: 576px; 
  `,
  md: css`
    max-width: 768px;
    padding-right: 16px;
    padding-left: 16px; 
  `,
  lg: css`
    max-width: 1160px; 
  `,
  xl: css`
    max-width: 1222px;
  `,
};

const Grid = {
  Container: styled.div`
    width: 100%;
    padding-right: 28px;
    padding-left: 28px;
    margin-right: auto;
    margin-left: auto;
    max-width: initial;
    ${breakpointsMedia(gridContainerBreakpointsChanges)}
    ${propToStyle('marginTop')}
    `,
  Row: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -16px;
    margin-left: -16px;
  `,
  Column: styled.div`
    padding-right: 16px;
    padding-left: 16px;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    ${propToStyle('display')}
    ${propToStyle('flexDirection')}
    ${propToStyle('alignItems')}
    ${propToStyle('justifyContent')}
    ${setColumnValue()}
    ${setColumnOffset()}
  `,
};

export default Grid;
