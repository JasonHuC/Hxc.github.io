import { generateMetaForFocalLength, getFocalLengthFromString } from '@/features/gallery/focal';
import FocalLengthOverview from '@/features/gallery/focal/FocalLengthOverview';
import FocalLengthShareModal from '@/features/gallery/focal/FocalLengthShareModal';
import { getPhotosFocalLengthDataCached } from '@/features/gallery/focal/data';
import { INFINITE_SCROLL_GRID_INITIAL } from '@/features/gallery/photo';
import type { Metadata } from 'next';
import { cache } from 'react';

const getPhotosFocalLengthDataCachedCached = cache((focal: number) =>
  getPhotosFocalLengthDataCached({
    focal,
    limit: INFINITE_SCROLL_GRID_INITIAL,
  }));

interface FocalLengthProps {
  params: { focal: string }
}

export async function generateMetadata({
  params: { focal: focalString },
}: FocalLengthProps): Promise<Metadata> {
  const focal = getFocalLengthFromString(focalString);

  const [
    photos,
    { count, dateRange },
  ] = await getPhotosFocalLengthDataCachedCached(focal);

  const {
    url,
    title,
    description,
    images,
  } = generateMetaForFocalLength(focal, photos, count, dateRange);

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

export default async function Share({
  params: { focal: focalString },
}: FocalLengthProps) {
  const focal = getFocalLengthFromString(focalString);

  const [
    photos,
    { count, dateRange },
  ] = await getPhotosFocalLengthDataCachedCached(focal);

  return <>
    <FocalLengthShareModal {...{ focal, photos, count, dateRange }} />
    <FocalLengthOverview
      {...{ focal, photos, count, dateRange }}
      animateOnFirstLoadOnly
    />
  </>;
}
