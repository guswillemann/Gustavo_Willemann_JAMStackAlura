import LoginScreen from '../../src/components/screens/app/LoginScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

export default websitePageHOC(LoginScreen, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Login',
    },
    menuProps: {
      display: false,
    },
    pageBoxProps: {
      backgroundThemedImage: '/bubbles.svg',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
      backgroundColor: 'background',
    },
  },
});
