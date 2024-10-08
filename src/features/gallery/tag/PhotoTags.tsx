import PhotoTag from '@/features/gallery/tag/PhotoTag';
import { isTagFavs } from './index';
import FavsTag from './FavsTag';
import { EntityLinkExternalProps } from '@/features/gallery/components/primitives/EntityLink';
import { Fragment } from 'react';

export default function PhotoTags({
  tags,
  contrast,
  prefetch,
}: {
  tags: string[]
} & EntityLinkExternalProps) {
  return (
    <div className="flex flex-col">
      {tags.map(tag =>
        <Fragment key={tag}>
          {isTagFavs(tag)
            ? <FavsTag {...{ contrast, prefetch }} />
            : <PhotoTag {...{ tag, contrast, prefetch }} />}
        </Fragment>)}
    </div>
  );
}
