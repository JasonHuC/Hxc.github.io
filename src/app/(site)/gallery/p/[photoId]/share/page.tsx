import { getPhotoCached } from '@/features/gallery/photo/cache';
import PhotoShareModal from '@/features/gallery/photo/PhotoShareModal';
import { PATH_ROOT } from '@/features/gallery/site/paths';
import { redirect } from 'next/navigation';

export default async function Share({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { return redirect(PATH_ROOT); }

  return <PhotoShareModal photo={photo} />;
}
