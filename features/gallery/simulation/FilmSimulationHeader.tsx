import { Photo, PhotoDateRange } from '@/features/gallery/photo';
import { FilmSimulation, descriptionForFilmSimulationPhotos } from '.';
import { pathForFilmSimulationShare } from '@/features/gallery/site/paths';
import PhotoHeader from '@/features/gallery/photo/PhotoHeader';
import PhotoFilmSimulation from
  '@/features/gallery/simulation/PhotoFilmSimulation';

export default function FilmSimulationHeader({
  simulation,
  photos,
  selectedPhoto,
  indexNumber,
  count,
  dateRange,
}: {
  simulation: FilmSimulation
  photos: Photo[]
  selectedPhoto?: Photo
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <PhotoHeader
      simulation={simulation}
      entity={<PhotoFilmSimulation {...{ simulation }} />}
      entityDescription={descriptionForFilmSimulationPhotos(
        photos, undefined, count, dateRange)}
      photos={photos}
      selectedPhoto={selectedPhoto}
      sharePath={pathForFilmSimulationShare(simulation)}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />
  );
}
