import PhotoTag from '@/features/gallery/tag/PhotoTag';
import { photoLabelForCount } from '@/features/gallery/photo';
import { clsx } from 'clsx';
import FavsTag from '@/features/gallery/tag/FavsTag';
import { isTagFavs } from '@/features/gallery/tag';
import Badge from '@/features/gallery/components/Badge';

export default function AdminTagBadge({
  tag,
  count,
  hideBadge,
}: {
  tag: string,
  count: number,
  hideBadge?: boolean,
}) {
  const renderBadgeContent = () =>
    <div className={clsx(
      'inline-flex items-center gap-2',
      // Fix nested EntityLink-in-Badge quirk for tags
      '[&>*>*:first-child]:items-center',
    )}>
      {isTagFavs(tag)
        ? <FavsTag />
        : <PhotoTag {...{ tag }} />}
      <div className="text-dim uppercase">
        <span>{count}</span>
        <span className="hidden xs:inline-block">
          &nbsp;
          {photoLabelForCount(count)}
        </span>
      </div>
    </div>;

  return (
    hideBadge
      ? renderBadgeContent()
      : <Badge className="!py-[3px]">{renderBadgeContent()}</Badge>
  );
}