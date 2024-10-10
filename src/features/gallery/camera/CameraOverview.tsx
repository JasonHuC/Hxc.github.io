import { Photo, PhotoDateRange } from '@/features/gallery/photo';
import { Camera, createCameraKey } from './index';
import CameraHeader from './CameraHeader';
import PhotoGridContainer from '@/features/gallery/photo/PhotoGridContainer';

export default function CameraOverview({
  camera,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
}: {
  camera: Camera,
  photos: Photo[],
  count: number,
  dateRange?: PhotoDateRange,
  animateOnFirstLoadOnly?: boolean,
}) {
  return (
    <PhotoGridContainer {...{
      cacheKey: `camera-${createCameraKey(camera)}`,
      photos,
      count,
      camera,
      animateOnFirstLoadOnly,
      header: <CameraHeader {...{
        camera,
        photos,
        count,
        dateRange,
      }} />,
    }} />
  );
}
