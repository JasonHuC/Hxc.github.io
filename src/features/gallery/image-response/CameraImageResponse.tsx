import { Photo } from '../photo';
import ImageCaption from './components/ImageCaption';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import ImageContainer from './components/ImageContainer';
import { Camera, cameraFromPhoto, formatCameraText } from '@/features/gallery/camera';
import { IoMdCamera } from 'react-icons/io';
import { NextImageSize } from '@/features/gallery/services/next-image';

export default function CameraImageResponse({
  camera: cameraProp,
  photos,
  width,
  height,
  fontFamily,
}: {
  camera: Camera
  photos: Photo[]
  width: NextImageSize
  height: number
  fontFamily: string
}) {
  const camera = cameraFromPhoto(photos[0], cameraProp);
  return (
    <ImageContainer {...{
      width,
      height,
      ...photos.length === 0 && { background: 'black' },
    }}>
      <ImagePhotoGrid
        {...{
          photos,
          width,
          height,
        }}
      />
      <ImageCaption {...{
        width,
        height,
        fontFamily,
        icon: <IoMdCamera
          size={height * .079}
          style={{
            transform: `translateY(${height * .003}px)`,
            marginRight: height * .015,
          }}
        />,
      }}>
        {formatCameraText(camera).toLocaleUpperCase()}
      </ImageCaption>
    </ImageContainer>
  );
}
