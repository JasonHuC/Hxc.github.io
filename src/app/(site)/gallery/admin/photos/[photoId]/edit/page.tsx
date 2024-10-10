import { redirect } from 'next/navigation';
import { getPhotoNoStore, getUniqueTagsCached } from '@/features/gallery/photo/cache';
import { PATH_ADMIN } from '@/features/gallery/site/paths';
import PhotoEditPageClient from '@/features/gallery/photo/PhotoEditPageClient';
import { AI_TEXT_GENERATION_ENABLED, BLUR_ENABLED } from '@/features/gallery/site/config';
import { blurImageFromUrl, resizeImageFromUrl } from '@/features/gallery/photo/server';
import { getNextImageUrlForManipulation } from '@/features/gallery/services/next-image';

export default async function PhotoEditPage({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoNoStore(photoId, true);

  if (!photo) { redirect(PATH_ADMIN); }

  const uniqueTags = await getUniqueTagsCached();

  const hasAiTextGeneration = AI_TEXT_GENERATION_ENABLED;
  
  // Only generate image thumbnails when AI generation is enabled
  const imageThumbnailBase64 = AI_TEXT_GENERATION_ENABLED
    ? await resizeImageFromUrl(getNextImageUrlForManipulation(photo.url))
    : '';

  const blurData = BLUR_ENABLED
    ? await blurImageFromUrl(
      getNextImageUrlForManipulation(photo.url)
    )
    : '';

  return (
    <PhotoEditPageClient {...{
      photo,
      uniqueTags,
      hasAiTextGeneration,
      imageThumbnailBase64,
      blurData,
    }} />
  );
};
