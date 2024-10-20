import { getPhotosCached } from '@/features/gallery/photo/cache';
import {
  GRID_OG_DIMENSION,
  MAX_PHOTOS_TO_SHOW_TEMPLATE,
} from '@/features/gallery/image-response';
import TemplateImageResponse from
  '@/features/gallery/image-response/TemplateImageResponse';
import { getIBMPlexMonoMedium } from '@/features/gallery/site/font';
import { ImageResponse } from 'next/og';
import { getImageResponseCacheControlHeaders } from '@/features/gallery/image-response/cache';
import { isNextImageReadyBasedOnPhotos } from '@/features/gallery/photo';

export async function GET() {
  const [
    photos,
    { fontFamily, fonts },
    headers,
  ] = await Promise.all([
    getPhotosCached({
      sortBy: 'priority',
      limit: MAX_PHOTOS_TO_SHOW_TEMPLATE,
    }).catch(() => []),
    getIBMPlexMonoMedium(),
    getImageResponseCacheControlHeaders(),
  ]);

  const { width, height } = GRID_OG_DIMENSION;

  // Make sure next/image can be reached from absolute urls,
  // which may not exist on first pre-render
  const isNextImageReady = await isNextImageReadyBasedOnPhotos(photos);
  
  return new ImageResponse(
    (
      <TemplateImageResponse {...{
        photos: isNextImageReady ? photos : [],
        width,
        height,
        fontFamily,
      }}/>
    ),
    { width, height, fonts, headers },
  );
}
