import type { Photo } from '../photo';
import { FaStar, FaTag } from 'react-icons/fa';
import ImageCaption from './components/ImageCaption';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import ImageContainer from './components/ImageContainer';
import type { NextImageSize } from '@/features/gallery/services/next-image';
import { formatTag, isTagFavs } from '@/features/gallery/tag';

export default function TagImageResponse({
  tag,
  photos,
  width,
  height,
  fontFamily,
}: {
  tag: string,
  photos: Photo[]
  width: NextImageSize
  height: number
  fontFamily: string
}) {  
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
        icon: isTagFavs(tag)
          ? <FaStar
            size={height * .066}
            style={{
              transform: `translateY(${height * .0095}px)`,
              // Fix horizontal distortion in icon size
              width: height * .076,
              marginRight: height * .015,
            }}
          />
          : <FaTag
            size={height * .06}
            style={{
              transform: `translateY(${height * .016}px)`,
              marginRight: height * .02,
            }}
          />,
      }}>
        {formatTag(tag).toLocaleUpperCase()}
      </ImageCaption>
    </ImageContainer>
  );
}
