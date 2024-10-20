import { getPhotoCached } from '@/features/gallery/photo/cache';
import { PhotoCameraProps, cameraFromPhoto } from '@/features/gallery/camera';
import PhotoShareModal from '@/features/gallery/photo/PhotoShareModal';
import { PATH_ROOT } from '@/features/gallery/site/paths';
import { redirect } from 'next/navigation';

export default async function Share({
  params: { photoId, make, model },
}: PhotoCameraProps) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { return redirect(PATH_ROOT); }

  const camera = cameraFromPhoto(photo, { make, model });

  return <PhotoShareModal {...{ photo, camera }} />;
}
