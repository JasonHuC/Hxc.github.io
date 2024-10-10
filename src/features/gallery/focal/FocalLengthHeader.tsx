import { Photo, PhotoDateRange } from '@/features/gallery/photo';
import { descriptionForFocalLengthPhotos } from './index';
import { pathForFocalLengthShare } from '@/features/gallery/site/paths';
import PhotoHeader from '@/features/gallery/photo/PhotoHeader';
import PhotoFocalLength from './PhotoFocalLength';

export default function FocalLengthHeader({
  focal,
  photos,
  selectedPhoto,
  indexNumber,
  count,
  dateRange,
}: {
  focal: number
  photos: Photo[]
  selectedPhoto?: Photo
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <PhotoHeader
      focal={focal}
      entity={<PhotoFocalLength focal={focal} contrast="high" />}
      entityDescription={descriptionForFocalLengthPhotos(
        photos,
        undefined,
        count,
      )}
      photos={photos}
      selectedPhoto={selectedPhoto}
      sharePath={pathForFocalLengthShare(focal)}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />
  );
}
