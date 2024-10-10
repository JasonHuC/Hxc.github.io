import { Photo, PhotoDateRange } from '@/features/gallery/photo';
import PhotoTag from './PhotoTag';
import { descriptionForTaggedPhotos, isTagFavs } from './index';
import { pathForTagShare } from '@/features/gallery/site/paths';
import PhotoHeader from '@/features/gallery/photo/PhotoHeader';
import FavsTag from './FavsTag';

export default function TagHeader({
  tag,
  photos,
  selectedPhoto,
  indexNumber,
  count,
  dateRange,
}: {
  tag: string
  photos: Photo[]
  selectedPhoto?: Photo
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <PhotoHeader
      tag={tag}
      entity={isTagFavs(tag) 
        ? <FavsTag contrast="high" />
        : <PhotoTag tag={tag} contrast="high" />}
      entityVerb="Tagged"
      entityDescription={descriptionForTaggedPhotos(photos, undefined, count)}
      photos={photos}
      selectedPhoto={selectedPhoto}
      sharePath={pathForTagShare(tag)}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />
  );
}
