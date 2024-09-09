import { absolutePathForCamera, pathForCamera } from '@/features/gallery/site/paths';
import { Photo, PhotoDateRange } from '../photo';
import ShareModal from '@/features/gallery/components/ShareModal';
import CameraOGTile from './CameraOGTile';
import { Camera } from './index';
import { shareTextForCamera } from './meta';

export default function CameraShareModal({
  camera,
  photos,
  count,
  dateRange,
}: {
  camera: Camera
  photos: Photo[]
  count: number
  dateRange?: PhotoDateRange,
}) {
  return (
    <ShareModal
      pathShare={absolutePathForCamera(camera)}
      pathClose={pathForCamera(camera)}
      socialText={shareTextForCamera(camera, photos)}
    >
      <CameraOGTile {...{ camera, photos, count, dateRange }} />
    </ShareModal>
  );
};
