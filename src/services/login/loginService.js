import { setCookie, destroyCookie } from 'nookies';
import isStaginEnv from '../../infra/env/isStagingEnv';
import HttpClient from '../../infra/http/HttpClient';

const BASE_URL = isStaginEnv
  // Back End de DEV
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back End de PROD
  : 'https://instalura-api-omariosouto.vercel.app';

export const LOGIN_COOKIE_APP_TOKEN = 'LOGIN_COOKIE_APP_TOKEN';

const loginService = {
  async login(
    { username },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient,
  ) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password: 'senhasegura',
      },
    }).then((responseAsJson) => {
      const { token } = responseAsJson.data;
      if (!token) throw new Error('Failed to login');
      const DAY_IN_SECONDS = 86400;
      setCookieModule(null, LOGIN_COOKIE_APP_TOKEN, token, {
        path: '/',
        maxAge: DAY_IN_SECONDS * 7,
      });
      return {
        token,
      };
    });
  },
  async logout(ctx, destroyCookieModule = destroyCookie) {
    destroyCookieModule(ctx, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
  },
};

export default loginService;
