import { getPhotos } from '@/features/gallery/photo/db/query';
import { OUTDATED_THRESHOLD } from '@/features/gallery/photo';
import AdminOutdatedClient from '@/app/admin/gallery/AdminOutdatedClient';
import { AI_TEXT_GENERATION_ENABLED } from '@/features/gallery/site/config';

export const maxDuration = 60;

export default async function AdminOutdatedPage() {
  const photos = await getPhotos({
    hidden: 'include',
    sortBy: 'createdAtAsc',
    updatedBefore: OUTDATED_THRESHOLD,
    limit: 1_000,
  }).catch(() => []);

  return (
    <AdminOutdatedClient {...{
      photos,
      hasAiTextGeneration: AI_TEXT_GENERATION_ENABLED,
    }} />
  );
}
