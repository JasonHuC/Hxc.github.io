import AnimateItems from '@/features/gallery/components/AnimateItems';
import { Photo, PhotoDateRange, PhotoSetAttributes } from './index';
import PhotoLarge from './PhotoLarge';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import PhotoGrid from './PhotoGrid';
import TagHeader from '@/features/gallery/tag/TagHeader';
import CameraHeader from '@/features/gallery/camera/CameraHeader';
import FilmSimulationHeader from '@/features/gallery/simulation/FilmSimulationHeader';
import { TAG_HIDDEN } from '@/features/gallery/tag';
import HiddenHeader from '@/features/gallery/tag/HiddenHeader';
import FocalLengthHeader from '@/features/gallery/focal/FocalLengthHeader';
import PhotoHeader from './PhotoHeader';

export default function PhotoDetailPage({
  photo,
  photos,
  photosGrid,
  tag,
  camera,
  simulation,
  focal,
  indexNumber,
  count,
  dateRange,
  shouldShare,
  includeFavoriteInAdminMenu,
}: {
  photo: Photo
  photos: Photo[]
  photosGrid?: Photo[]
  indexNumber?: number
  count?: number
  dateRange?: PhotoDateRange
  shouldShare?: boolean
  includeFavoriteInAdminMenu?: boolean
} & PhotoSetAttributes) {
  let customHeader: JSX.Element | undefined;

  if (tag) {
    customHeader = tag === TAG_HIDDEN
      ? <HiddenHeader
        photos={photos}
        selectedPhoto={photo}
        indexNumber={indexNumber}
        count={count ?? 0}
      />
      : <TagHeader
        key={tag}
        tag={tag}
        photos={photos}
        selectedPhoto={photo}
        indexNumber={indexNumber}
        count={count}
        dateRange={dateRange}
      />;
  } else if (camera) {
    customHeader = <CameraHeader
      camera={camera}
      photos={photos}
      selectedPhoto={photo}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />;
  } else if (simulation) {
    customHeader = <FilmSimulationHeader
      simulation={simulation}
      photos={photos}
      selectedPhoto={photo}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />;
  } else if (focal) {
    customHeader = <FocalLengthHeader
      focal={focal}
      photos={photos}
      selectedPhoto={photo}
      indexNumber={indexNumber}
      count={count}
      dateRange={dateRange}
    />;
  }

  return (
    <div>
      <SiteGrid
        className="mt-1.5 mb-6"
        contentMain={customHeader ?? <PhotoHeader
          selectedPhoto={photo}
          photos={photos}
        />}
      />
      <AnimateItems
        className="md:mb-8"
        animateFromAppState
        items={[
          <PhotoLarge
            key={photo.id}
            photo={photo}
            primaryTag={tag}
            priority
            prefetchRelatedLinks
            showTitle={Boolean(customHeader)}
            showCamera={!camera}
            showSimulation={!simulation}
            shouldShare={shouldShare}
            shouldShareTag={tag !== undefined}
            shouldShareCamera={camera !== undefined}
            shouldShareSimulation={simulation !== undefined}
            shouldScrollOnShare={false}
            includeFavoriteInAdminMenu={includeFavoriteInAdminMenu}
          />,
        ]}
      />
      <SiteGrid
        sideFirstOnMobile
        contentMain={<PhotoGrid
          photos={photosGrid ?? photos}
          selectedPhoto={photo}
          tag={tag}
          camera={camera}
          simulation={simulation}
          focal={focal}
          animateOnFirstLoadOnly
        />}
      />
    </div>
  );
}
