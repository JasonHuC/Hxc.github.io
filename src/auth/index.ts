import { isPathProtected } from '@/features/gallery/site/paths';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const KEY_CREDENTIALS_SIGN_IN_ERROR = 'CredentialsSignin';
export const KEY_CREDENTIALS_SIGN_IN_ERROR_URL =
  'https://errors.authjs.dev#credentialssignin';
export const KEY_CREDENTIALS_CALLBACK_ROUTE_ERROR_URL =
  'https://errors.authjs.dev#callbackrouteerror';
export const KEY_CALLBACK_URL = 'callbackUrl';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      async authorize({ email, password }) {
        if (
          process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email &&
          process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD === password
        ) {
          const user: User = { email, name: 'Admin User' };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;//request.nextUrl.pathname 获取请求的路径

      const isUrlProtected = isPathProtected(pathname);//使用 isPathProtected 函数检查该路径是否需要保护（即是否需要登录才能访问）。
      const isUserLoggedIn = !!auth?.user;//!!将后面的变量转为布尔型
      const isRequestAuthorized = !isUrlProtected || isUserLoggedIn;

      return isRequestAuthorized;
    },
  },
  pages: {
    signIn: '/gallery/sign-in',
  },
});

export const runAuthenticatedAdminServerAction = async <T>(
  callback: () => T,
): Promise<T> => {
  const session = await auth();
  if (session?.user) {
    return callback();
  } else {
    throw new Error('Unauthorized server action request');
  }
};

export const generateAuthSecret = () => fetch(
  'https://generate-secret.vercel.app/32',
  { cache: 'no-cache' },
).then(res => res.text());
