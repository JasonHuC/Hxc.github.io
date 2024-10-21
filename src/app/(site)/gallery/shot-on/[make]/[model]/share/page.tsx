import { CameraProps } from '@/features/gallery/camera';
import CameraShareModal from '@/features/gallery/camera/CameraShareModal';
import { generateMetaForCamera } from '@/features/gallery/camera/meta';
import { Metadata } from 'next/types';
import { INFINITE_SCROLL_GRID_INITIAL } from '@/features/gallery/photo';
import { getPhotosCameraDataCached } from '@/features/gallery/camera/data';
import CameraOverview from '@/features/gallery/camera/CameraOverview';
import { cache } from 'react';

const getPhotosCameraDataCachedCached = cache((
  make: string,
  model: string,
) => getPhotosCameraDataCached(
  make,
  model,
  INFINITE_SCROLL_GRID_INITIAL,
));

export async function generateMetadata({
  params: { make, model },
}: CameraProps): Promise<Metadata> {
  const [
    photos,
    { count, dateRange },
    camera,
  ] = await getPhotosCameraDataCachedCached(make, model);

  const {
    url,
    title,
    description,
    images,
  } = generateMetaForCamera(camera, photos, count, dateRange);

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

export default async function Share({ params: { make, model } }: CameraProps) {
  const [
    photos,
    { count, dateRange },
    camera,
  ] = await getPhotosCameraDataCachedCached(make, model);

  return <>
    <CameraShareModal {...{ camera, photos, count, dateRange }} />
    <CameraOverview
      {...{ camera, photos, count, dateRange }}
      animateOnFirstLoadOnly
    />
  </>;
}