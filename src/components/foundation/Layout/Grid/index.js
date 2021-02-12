import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import { breakpointsTemplate } from '../../../../theme/Breakpoints';

export const Grid = {
    Container: styled.div`
        width: 100%;
        padding-right: 28px;
        padding-left: 28px;
        margin-right: auto;
        margin-left: auto;
        max-width: initial;
        ${breakpointsMedia({
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
        })}
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

        ${function({ value }) {
            if(typeof value === 'number') {
                return css `
                    flex: 0 0 ${(100 * value) / 12}%;
                `
            }
            else return ({ value }) => {
                if(value === undefined) return;
                const baseObject = breakpointsTemplate;
                for(const element in baseObject) { 
                    if(value[element] === undefined) continue;
                    baseObject[element] = css`
                    flex: 0 0 ${(100 * value[element]) / 12}%;
                `
                }
                return breakpointsMedia(baseObject);
            }
        }}
        ${function({ offset }) {
            if(typeof offset === 'number') {
                return css `
                    margin-left: ${(100 * offset) / 12}%;
                `
            }
            else return ({ offset }) => {
                if(offset === undefined) return;
                const baseObject = breakpointsTemplate;
                for(const element in baseObject) { 
                    if(offset[element] === undefined) continue;
                    baseObject[element] = css`
                    margin-left: ${(100 * offset[element]) / 12}%;
                `
                }
                return breakpointsMedia(baseObject);
            }
        }}
    `,
};