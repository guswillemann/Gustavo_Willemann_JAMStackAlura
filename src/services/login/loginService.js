import { setCookie, destroyCookie } from 'nookies';
import isStaginEnv from '../../infra/env/isStagingEnv';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  })
    .then((serverResponse) => {
      if (serverResponse.ok) return serverResponse.json();
      if (serverResponse.status === 401) throw new Error('Acesso negado, verifique seu usuário e senha');
      else throw new Error('Falha em obter os dados do servidor');
    });
}

const BASE_URL = isStaginEnv
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api-omariosouto.vercel.app';

const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient,
  ) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((responseAsJson) => {
      const { token } = responseAsJson.data;
      if (!token) throw new Error('Failed to login');
      const DAY_IN_SECONDS = 86400;
      setCookieModule(null, 'APP_TOKEN', token, {
        path: '/',
        maxAge: DAY_IN_SECONDS * 7,
      });
      return {
        token,
      };
    });
  },
  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};

export default loginService;
