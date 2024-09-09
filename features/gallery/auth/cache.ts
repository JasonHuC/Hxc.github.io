import { cache } from 'react';
import { auth } from '@/features/gallery/auth';

export const authCachedSafe = cache(() => auth().catch(() => null));
