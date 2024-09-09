import {
  getUniqueCamerasCached,
  getUniqueFilmSimulationsCached,
  getUniqueTagsCached,
} from '@/features/gallery/photo/cache';
import {
  getUniqueCameras,
  getUniqueFilmSimulations,
  getUniqueTags,
} from '@/features/gallery/photo/db/query';
import { SHOW_FILM_SIMULATIONS } from '@/features/gallery/site/config';
import { sortTagsObject } from '@/features/gallery/tag';

export const getPhotoSidebarData = () => [
  getUniqueTags().then(sortTagsObject).catch(() => []),
  getUniqueCameras().catch(() => []),
  SHOW_FILM_SIMULATIONS
    ? getUniqueFilmSimulations().catch(() => [])
    : [],
] as const;

export const getPhotoSidebarDataCached = () => [
  getUniqueTagsCached().then(sortTagsObject),
  getUniqueCamerasCached(),
  SHOW_FILM_SIMULATIONS ? getUniqueFilmSimulationsCached() : [],
] as const;
