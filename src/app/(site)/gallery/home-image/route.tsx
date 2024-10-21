import { getPhotosCached } from '@/features/gallery/photo/cache';
import {
  IMAGE_OG_DIMENSION_SMALL,
  MAX_PHOTOS_TO_SHOW_OG,
} from '@/features/gallery/image-response';
import HomeImageResponse from '@/features/gallery/image-response/HomeImageResponse';
import { getIBMPlexMonoMedium } from '@/features/gallery/site/font';
import { ImageResponse } from 'next/og';
import { getImageResponseCacheControlHeaders } from '@/features/gallery/image-response/cache';
import { isNextImageReadyBasedOnPhotos } from '@/features/gallery/photo';

export const dynamic = 'force-static';

export async function GET() {
  const [
    photos,
    headers,
    { fontFamily, fonts },
  ] = await Promise.all([
    getPhotosCached({ limit: MAX_PHOTOS_TO_SHOW_OG }).catch(() => []),
    getImageResponseCacheControlHeaders(),
    getIBMPlexMonoMedium(),
  ]);

  const { width, height } = IMAGE_OG_DIMENSION_SMALL;

  // Make sure next/image can be reached from absolute urls,
  // which may not exist on first pre-render
  const isNextImageReady = await isNextImageReadyBasedOnPhotos(photos);

  return new ImageResponse(
    <HomeImageResponse {...{
      photos: isNextImageReady ? photos : [],
      width,
      height,
      fontFamily,
    }}/>,
    { width, height, headers, fonts },
  );
}