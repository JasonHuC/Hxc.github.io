import { getPhotosCached } from '@/features/gallery/photo/cache';
import {
  IMAGE_OG_DIMENSION_SMALL,
  MAX_PHOTOS_TO_SHOW_PER_TAG,
} from '@/features/gallery/image-response';
import TagImageResponse from '@/features/gallery/image-response/TagImageResponse';
import { getIBMPlexMonoMedium } from '@/features/gallery/site/font';
import { ImageResponse } from 'next/og';
import { getImageResponseCacheControlHeaders } from '@/features/gallery/image-response/cache';

export async function GET(
  _: Request,
  context: { params: { tag: string } },
) {
  const { tag } = context.params;

  const [
    photos,
    { fontFamily, fonts },
    headers,
  ] = await Promise.all([
    getPhotosCached({ limit: MAX_PHOTOS_TO_SHOW_PER_TAG, tag }),
    getIBMPlexMonoMedium(),
    getImageResponseCacheControlHeaders(),
  ]);

  const { width, height } = IMAGE_OG_DIMENSION_SMALL;

  return new ImageResponse(
    <TagImageResponse {...{
      tag,
      photos,
      width,
      height,
      fontFamily,
    }}/>,
    { width, height, fonts, headers },
  );
}
