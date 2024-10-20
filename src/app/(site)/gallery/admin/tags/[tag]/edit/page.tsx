import AdminChildPage from '@/features/gallery/components/AdminChildPage';
import { redirect } from 'next/navigation';
import { getPhotosCached } from '@/features/gallery/photo/cache';
import TagForm from '@/features/gallery/tag/TagForm';
import { PATH_ADMIN, PATH_ADMIN_TAGS, pathForTag } from '@/features/gallery/site/paths';
import PhotoLightbox from '@/features/gallery/photo/PhotoLightbox';
import { getPhotosMeta } from '@/features/gallery/photo/db/query';
import AdminTagBadge from '@/app/admin/gallery/AdminTagBadge';
import {forEach} from "lodash-es";

const MAX_PHOTO_TO_SHOW = 6;

interface Props {
  params: { tag: string }
}

export default async function PhotoPageEdit({
  params: { tag: tagFromParams } }: Props
) {
  const tag = decodeURIComponent(tagFromParams);
  
  const [
    { count },
    photos,
  ] = await Promise.all([
    getPhotosMeta({ tag }),
    getPhotosCached({ tag, limit: MAX_PHOTO_TO_SHOW }),
  ]);

  if (count === 0) { redirect(PATH_ADMIN); }

  return (
    <AdminChildPage
      backPath={PATH_ADMIN_TAGS}
      backLabel="Tags"
      breadcrumb={<AdminTagBadge {...{ tag, count, hideBadge: true }} />}
    >
      <TagForm {...{ tag, photos }}>
        <PhotoLightbox
          {...{ count, photos }}
          maxPhotosToShow={MAX_PHOTO_TO_SHOW}
          moreLink={pathForTag(tag)}
        />
      </TagForm>
    </AdminChildPage>
  );
};
