import { unstable_noStore } from 'next/cache';
import { getStoragePhotoUrls, getStorageUploadUrls } from '@/features/gallery/services/storage/index';

export const getStorageUploadUrlsNoStore: typeof getStorageUploadUrls =
  (...args) => {
    unstable_noStore();
    return getStorageUploadUrls(...args);
  };

export const getStoragePhotoUrlsNoStore: typeof getStoragePhotoUrls =
  (...args) => {
    unstable_noStore();
    return getStoragePhotoUrls(...args);
  };