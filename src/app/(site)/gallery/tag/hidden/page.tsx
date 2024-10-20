import AnimateItems from '@/features/gallery/components/AnimateItems';
import Note from '@/features/gallery/components/Note';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import PhotoGrid from '@/features/gallery/photo/PhotoGrid';
import { getPhotosNoStore } from '@/features/gallery/photo/cache';
import { getPhotosMeta } from '@/features/gallery/photo/db/query';
import { absolutePathForTag } from '@/features/gallery/site/paths';
import { TAG_HIDDEN, descriptionForTaggedPhotos, titleForTag } from '@/features/gallery/tag';
import HiddenHeader from '@/features/gallery/tag/HiddenHeader';
import { Metadata } from 'next';
import { cache } from 'react';

const getPhotosHiddenMetaCached = cache(() =>
  getPhotosMeta({ hidden: 'only' }));

export async function generateMetadata(): Promise<Metadata> {
  const { count, dateRange } = await getPhotosHiddenMetaCached();

  if (count === 0) { return {}; }

  const title = titleForTag(TAG_HIDDEN, undefined, count);
  const description = descriptionForTaggedPhotos(
    undefined,
    undefined,
    count,
    dateRange,
  );
  const url = absolutePathForTag(TAG_HIDDEN);

  return {
    title,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      description,
      card: 'summary_large_image',
    },
    description,
  };
}

export default async function HiddenTagPage() {
  const [
    photos,
    { count, dateRange },
  ] = await Promise.all([
    getPhotosNoStore({ hidden: 'only' }),
    getPhotosHiddenMetaCached(),
  ]);

  return (
    <SiteGrid
      contentMain={<div className="space-y-4 mt-4">
        <AnimateItems
          type="bottom"
          items={[<HiddenHeader
            key="HiddenHeader"
            {...{ photos, count, dateRange }}
          />]}
          animateOnFirstLoadOnly
        />
        <div className="space-y-6">
          <Note animate>
            Only visible to authenticated admins
          </Note>
          <PhotoGrid {...{ photos }} />
        </div>
      </div>}
    />
  );
}
