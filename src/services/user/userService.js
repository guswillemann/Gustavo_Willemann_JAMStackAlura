import isStagingEnv from '../../infra/env/isStagingEnv';
import HttpClient from '../../infra/http/HttpClient';
import authService from '../auth/authService';

const EXTERNAL_URL = isStagingEnv
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api.vercel.app';

const userService = {
  async getUserData(ctx) {
    const session = await authService(ctx).getSession();
    const userData = await HttpClient('/api/user', {
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
      return response.data.reverse();
    } catch (err) {
      throw new Error('Não conseguimos pegar os posts');
    }
  },

  async sendNewPost({ photoUrl, description, filter }) {
    const url = `${EXTERNAL_URL}/api/posts`;
    try {
      const token = await authService().getToken();
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          photoUrl,
          description,
          filter,
        },
      });
      return response.data;
    } catch {
      throw new Error('Falha na criação do post.');
    }
  },

  async likePost(postId) {
    const url = `${EXTERNAL_URL}/api/posts/${postId}/like`;
    const token = await authService().getToken();
    return fetch(url, {
      method: 'POST',
      'Content-Type': 'application/json',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then(async (response) => {
        if (response.status === 201) {
          const { data } = await response.json();
          return data;
        }
        return undefined;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};

export default userService;
