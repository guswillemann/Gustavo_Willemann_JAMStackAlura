import typographyVariants from './TypographyVariants';

const light = {
  logo: { color: '#070C0E' },
  background: {
    color: '#FFFFFF',
    main: { color: '#F2F2F2' },
  },
  borders: { color: '#F1F1F1' },
  primary: {
    color: '#D7385E',
    contrast: '#FFFFFF',
  },
  secondary: { color: '#FB7B6B' },
  tertiary: {
    color: '#88989E',
    contrast: '#FFFFFF',
    main: { color: '#070C0E' },
  },
  error: { color: '#dc3545' },
  success: { color: '#28a745' },
};

const dark = {
  logo: { color: '#FFFFFF' },
  background: {
    color: '#030506',
    main: { color: '#030506' },
  },
  borders: { color: '#181F22' },
  primary: {
    color: '#F27895',
    contrast: '#FFFFFF',
  },
  secondary: { color: '#FFA59A' },
  tertiary: {
    color: '#D5D5D5',
    contrast: '#FFFFFF',
    main: { color: '#FFFFFF' },
  },
  error: { color: '#EB5C50' },
  success: { color: '#28a745' },
};

export const colorThemes = {
  light,
  dark,
};

export default {
  borderRadius: '12px',
  transition: '200ms ease-in-out',
  typographyVariants,
  fontFamily: '\'Rubik\', sans-serif',
};
