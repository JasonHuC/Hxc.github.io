import { cache } from 'react';
import { auth } from '@/auth/index';

export const authCachedSafe = cache(() => auth().catch(() => null));
