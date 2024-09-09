'use client';

import { Tags } from '@/features/gallery/tag';
import { Photo } from '.';
import { Cameras } from '@/features/gallery/camera';
import { FilmSimulations } from '@/features/gallery/simulation';
import { PATH_GRID } from '@/features/gallery/site/paths';
import PhotoGridSidebar from './PhotoGridSidebar';
import PhotoGridContainer from './PhotoGridContainer';
import { useEffect } from 'react';
import { useAppState } from '@/features/gallery/state/AppState';

export default function PhotoGridPage({
  photos,
  photosCount,
  tags,
  cameras,
  simulations,
}:{
  photos: Photo[]
  photosCount: number
  tags: Tags
  cameras: Cameras
  simulations: FilmSimulations
}) {
  const { setSelectedPhotoIds } = useAppState();
  
  useEffect(
    () => () => setSelectedPhotoIds?.(undefined),
    [setSelectedPhotoIds]
  );

  return (
    <PhotoGridContainer
      cacheKey={`page-${PATH_GRID}`}
      photos={photos}
      count={photosCount}
      sidebar={<div className="sticky top-4 space-y-4 mt-[-4px]">
        <PhotoGridSidebar {...{
          tags,
          cameras,
          simulations,
          photosCount,
        }} />
      </div>}
      canSelect
    />
  );
}
