import { absolutePathForTag, pathForTag } from '@/features/gallery/site/paths';
import { Photo, PhotoDateRange } from '../photo';
import ShareModal from '@/features/gallery/components/ShareModal';
import TagOGTile from './TagOGTile';
import { shareTextForTag } from './index';

export default function TagShareModal({
  tag,
  photos,
  count,
  dateRange,
}: {
  tag: string
  photos: Photo[]
  count?: number
  dateRange?: PhotoDateRange
}) {
  return (
    <ShareModal
      pathShare={absolutePathForTag(tag)}
      pathClose={pathForTag(tag)}
      socialText={shareTextForTag(tag)}
    >
      <TagOGTile {...{ tag, photos, count, dateRange }} />
    </ShareModal>
  );
};
