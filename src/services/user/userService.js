import isStagingEnv from '../../infra/env/isStagingEnv';
import HttpClient from '../../infra/http/HttpClient';
import authService from '../auth/authService';

const EXTERNAL_URL = isStagingEnv
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api.vercel.app';

const INTERNAL_URL = isStagingEnv
  ? 'http://localhost:3000'
  : 'https://instalura.guswillemann.vercel.app';

const userService = {
  async getProfilePage(ctx) {
    const { posts } = await this.getPostsData(ctx);
    const user = await this.getUserData(ctx);

    return {
      user,
      posts,
    };
  },
  async getUserData(ctx) {
    const session = await authService(ctx).getSession();
    const userData = await HttpClient(`${INTERNAL_URL}/api/user`, {
      method: 'POST',
      body: {
        id: session.id,
      },
    });

    return {
      ...session,
      ...userData,
    };
  },
  async getPostsData(ctx) {
    const url = `${EXTERNAL_URL}/api/users/posts`;
    try {
      const token = await authService(ctx).getToken();
      const response = await HttpClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return {
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos pegar os posts');
    }
  },
};

export default userService;
