import {
  getPhotosCached,
  getPhotosMetaCached,
} from '@/features/gallery/photo/cache';

export const getPhotosTagDataCached = ({
  tag,
  limit,
}: {
  tag: string,
  limit?: number,
}) =>
  Promise.all([
    getPhotosCached({ tag, limit }),
    getPhotosMetaCached({ tag }),
  ]);

