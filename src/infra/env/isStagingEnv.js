const isServer = typeof window === 'undefined';

const isStaginEnv = isServer
  ? process.env.NODE_ENV === 'development'
  : globalThis.location.href.includes('localhost');

export default isStaginEnv;
