import { Photo, photoQuantityText } from '@/features/gallery/photo';
import PhotoHeader from '@/features/gallery/photo/PhotoHeader';
import HiddenTag from './HiddenTag';

export default function HiddenHeader({
  photos,
  selectedPhoto,
  indexNumber,
  count,
}: {
  photos: Photo[]
  selectedPhoto?: Photo
  indexNumber?: number
  count: number
}) {
  return (
    <PhotoHeader
      key="HiddenHeader"
      entity={<HiddenTag contrast="high" />}
      entityDescription={photoQuantityText(count, false)}
      photos={photos}
      selectedPhoto={selectedPhoto}
      indexNumber={indexNumber}
      count={count}
    />
  );
}
