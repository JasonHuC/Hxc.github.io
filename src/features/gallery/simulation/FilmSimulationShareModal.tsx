import {
  absolutePathForFilmSimulation,
  pathForFilmSimulation,
} from '@/features/gallery/site/paths';
import { Photo, PhotoDateRange } from '../photo';
import ShareModal from '@/features/gallery/components/ShareModal';
import FilmSimulationOGTile from './FilmSimulationOGTile';
import { FilmSimulation, shareTextForFilmSimulation } from './index';

export default function FilmSimulationShareModal({
  simulation,
  photos,
  count,
  dateRange,
}: {
  simulation: FilmSimulation
  photos: Photo[]
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <ShareModal
      pathShare={absolutePathForFilmSimulation(simulation)}
      pathClose={pathForFilmSimulation(simulation)}
      socialText={shareTextForFilmSimulation(simulation)}
    >
      <FilmSimulationOGTile {...{ simulation, photos, count, dateRange }} />
    </ShareModal>
  );
};
