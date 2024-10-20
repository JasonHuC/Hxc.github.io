import { getPhotosCached } from '@/features/gallery/photo/cache';
import {
  IMAGE_OG_DIMENSION,
  MAX_PHOTOS_TO_SHOW_TEMPLATE_TIGHT,
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
      limit: MAX_PHOTOS_TO_SHOW_TEMPLATE_TIGHT,
    }).catch(() => []),
    getIBMPlexMonoMedium(),
    getImageResponseCacheControlHeaders(),
  ]);

  const { width, height } = IMAGE_OG_DIMENSION;

  // Make sure next/image can be reached from absolute urls,
  // which may not exist on first pre-render
  const isNextImageReady = await isNextImageReadyBasedOnPhotos(photos);

  return new ImageResponse(
    (
      <TemplateImageResponse {...{
        photos: isNextImageReady ? photos : [],
        includeHeader: false,
        outerMargin: 0,
        width,
        height,
        fontFamily,
      }}/>
    ),
    {
      width,
      height,
      fonts,
      headers,
    },
  );
}
