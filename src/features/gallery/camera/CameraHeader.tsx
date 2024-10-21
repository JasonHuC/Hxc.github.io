import { Photo, PhotoDateRange } from '@/features/gallery/photo';
import { pathForCameraShare } from '@/features/gallery/site/paths';
import PhotoHeader from '@/features/gallery/photo/PhotoHeader';
import { Camera, cameraFromPhoto } from './index';
import PhotoCamera from './PhotoCamera';
import { descriptionForCameraPhotos } from './meta';

export default function CameraHeader({
  camera: cameraProp,
  photos,
  selectedPhoto,
  indexNumber,
  count,
  dateRange,
}: {
  camera: Camera
  photos: Photo[]
  selectedPhoto?: Photo
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
}) {
  const camera = cameraFromPhoto(photos[0], cameraProp);
  return (
    <PhotoHeader
      camera={camera}
      entity={<PhotoCamera {...{ camera }} contrast="high" hideAppleIcon />}
      entityDescription={
        descriptionForCameraPhotos(photos, undefined, count, dateRange)}
      photos={photos}
      selectedPhoto={selectedPhoto}
      sharePath={pathForCameraShare(camera)}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />
  );
}