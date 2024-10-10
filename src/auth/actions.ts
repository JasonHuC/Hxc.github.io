'use server';

import {
  KEY_CALLBACK_URL,//登录成功后的回调 URL
  KEY_CREDENTIALS_CALLBACK_ROUTE_ERROR_URL,//用于标识登录时的错误信息。
  KEY_CREDENTIALS_SIGN_IN_ERROR,
  KEY_CREDENTIALS_SIGN_IN_ERROR_URL,
    //分别用于获取当前身份验证状态、处理登录和登出操作。
  auth,
  signIn,
  signOut,
} from './index';
import { PATH_ADMIN_PHOTOS, PATH_ROOT } from '@/features/gallery/site/paths';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export const signInAction = async (
  _prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (
      `${error}`.includes(KEY_CREDENTIALS_SIGN_IN_ERROR) || 
      `${error}`.includes(KEY_CREDENTIALS_SIGN_IN_ERROR_URL) ||
      // New error thrown in next-auth 5.0.0-beta.19 for incorrect credentials
      `${error}`.includes(KEY_CREDENTIALS_CALLBACK_ROUTE_ERROR_URL)
    ) {
      // Return credentials error to display on sign-in page.
      return KEY_CREDENTIALS_SIGN_IN_ERROR;
    } else if (!`${error}`.includes('NEXT_REDIRECT')) {
      console.log('Unknown sign in error:', {
        errorText: `${error}`,
        error,
      });
      // Rethrow non-redirect errors
      throw error;
    }
  }
  redirect(formData.get(KEY_CALLBACK_URL) as string || PATH_ADMIN_PHOTOS);
};

export const signOutAndRedirectAction = async () =>
  signOut({ redirectTo: PATH_ROOT });

export const getAuthAction = () => auth();

export const logClientAuthUpdate = async (data: Session | null | undefined) =>
  console.log('Client auth update', data);
