import {
  getPhotosCached,
  getPhotosMetaCached,
} from '@/features/gallery/photo/cache';
import { FilmSimulation } from './index';

export const getPhotosFilmSimulationDataCached = ({
  simulation,
  limit,
}: {
  simulation: FilmSimulation,
  limit?: number,
}) =>
  Promise.all([
    getPhotosCached({ simulation, limit }),
    getPhotosMetaCached({ simulation }),
  ]);
