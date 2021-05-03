import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import ProfileScreen from '../../src/components/screens/app/ProfileScreen';
import authService from '../../src/services/auth/authService';
import userService from '../../src/services/user/userService';

export default websitePageHOC(ProfileScreen, {
  pageWrapperProps: {
    menuProps: {
      display: true,
      variant: 'app',
    },
    footerProps: {
      display: true,
    },
    pageBoxProps: {
      backgroundColor: 'colors.background.main.color',
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const { user, posts } = await userService.getProfilePage(ctx);

    return {
      props: {
        user,
        posts,
        pageWrapperProps: {
          seoProps: {
            headTitle: user.username,
          },
        },
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
