import { INFINITE_SCROLL_GRID_INITIAL } from '@/features/gallery/photo';
import { PATH_ROOT } from '@/features/gallery/site/paths';
import { generateMetaForTag } from '@/features/gallery/tag';
import TagOverview from '@/features/gallery/tag/TagOverview';
import { getPhotosTagDataCached } from '@/features/gallery/tag/data';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const getPhotosTagDataCachedCached = cache((tag: string) =>
  getPhotosTagDataCached({ tag, limit: INFINITE_SCROLL_GRID_INITIAL}));

interface TagProps {
  params: { tag: string }
}

export async function generateMetadata({
  params: { tag: tagFromParams },
}: TagProps): Promise<Metadata> {
  const tag = decodeURIComponent(tagFromParams);

  const [
    photos,
    { count, dateRange },
  ] = await getPhotosTagDataCachedCached(tag);

  if (photos.length === 0) { return {}; }

  const {
    url,
    title,
    description,
    images,
  } = generateMetaForTag(tag, photos, count, dateRange);

  return {
    title,
    openGraph: {
      title,
      description,
      images,
      url,
    },
    twitter: {
      images,
      description,
      card: 'summary_large_image',
    },
    description,
  };
}

export default async function TagPage({
  params: { tag: tagFromParams },
}:TagProps) {
  const tag = decodeURIComponent(tagFromParams);

  const [
    photos,
    { count, dateRange },
  ] = await getPhotosTagDataCachedCached(tag);

  if (photos.length === 0) { redirect(PATH_ROOT); }

  return (
    <TagOverview {...{ tag, photos, count, dateRange }} />
  );
}
