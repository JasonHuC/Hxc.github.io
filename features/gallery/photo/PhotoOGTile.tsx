import {
  Photo,
  descriptionForPhoto,
  titleForPhoto,
} from '@/features/gallery/photo';
import { absolutePathForPhotoImage, pathForPhoto } from '@/features/gallery/site/paths';
import OGTile from '@/features/gallery/components/OGTile';

export type OGLoadingState = 'unloaded' | 'loading' | 'loaded' | 'failed';

export default function PhotoOGTile({
  photo,
  loadingState: loadingStateExternal,
  riseOnHover,
  onLoad,
  onFail,
  retryTime,
  onVisible,
}: {
  photo: Photo
  loadingState?: OGLoadingState
  onLoad?: () => void
  onFail?: () => void
  riseOnHover?: boolean
  retryTime?: number
  onVisible?: () => void
}) {
  return (
    <OGTile {...{
      title: titleForPhoto(photo),
      description: descriptionForPhoto(photo),
      path: pathForPhoto({ photo }),
      pathImageAbsolute: absolutePathForPhotoImage(photo),
      loadingState: loadingStateExternal,
      onLoad,
      onFail,
      riseOnHover,
      retryTime,
      onVisible,
    }}/>
  );
};
