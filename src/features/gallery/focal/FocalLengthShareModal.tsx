import { absolutePathForFocalLength, pathForFocalLength } from '@/features/gallery/site/paths';
import { Photo, PhotoDateRange } from '../photo';
import ShareModal from '@/features/gallery/components/ShareModal';
import FocalLengthOGTile from './FocalLengthOGTile';
import { shareTextFocalLength } from './index';

export default function FocalLengthShareModal({
  focal,
  photos,
  count,
  dateRange,
}: {
  focal: number
  photos: Photo[]
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <ShareModal
      pathShare={absolutePathForFocalLength(focal)}
      pathClose={pathForFocalLength(focal)}
      socialText={shareTextFocalLength(focal)}
    >
      <FocalLengthOGTile {...{ focal, photos, count, dateRange }} />
    </ShareModal>
  );
};
