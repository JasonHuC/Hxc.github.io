import PhotoOGTile from '@/features/gallery/photo/PhotoOGTile';
import { absolutePathForPhoto, pathForPhoto } from '@/features/gallery/site/paths';
import { Photo, PhotoSetAttributes } from '.';
import ShareModal from '@/features/gallery/components/ShareModal';

export default function PhotoShareModal(props: {
  photo: Photo
} & PhotoSetAttributes) {
  return (
    <ShareModal
      pathShare={absolutePathForPhoto(props)}
      pathClose={pathForPhoto(props)}
      socialText="Check out this photo"
    >
      <PhotoOGTile photo={props.photo} />
    </ShareModal>
  );
};
