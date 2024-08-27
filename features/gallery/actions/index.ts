'use server';

import { type Prisma } from '@prisma/client';
import { isUndefined } from 'lodash-es';

import { ERROR_NO_PERMISSION, PUBLISHED_MAP } from '@/constants';
import { batchGetGalleryUV } from '@/features/statistics';
import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';