import {Wrapper} from "@/app/components/wrapper";
import {
    INFINITE_SCROLL_FEED_INITIAL,
    INFINITE_SCROLL_GRID_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/features/gallery/photo';
import PhotosEmptyState from '@/features/gallery/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import { cache } from 'react';
import { getPhotos, getPhotosMeta } from '@/features/gallery/photo/db/query';
import { GRID_HOMEPAGE_ENABLED } from '@/features/gallery/site/config';
import { getPhotoSidebarData } from '@/features/gallery/photo/data';
import PhotoGridPage from '@/features/gallery/photo/PhotoGridPage';
import PhotoFeedPage from '@/features/gallery/photo/PhotoFeedPage';
export const dynamic = 'force-static';
export const maxDuration = 60;

const getPhotosCached = cache(() => getPhotos({
    limit: GRID_HOMEPAGE_ENABLED
        ? INFINITE_SCROLL_GRID_INITIAL
        : INFINITE_SCROLL_FEED_INITIAL,
}));

export async function generateMetadata(): Promise<Metadata> {
    const photos = await getPhotosCached()
        .catch(() => []);//捕获在执行异步操作时发生的任何错误，并在错误发生时返回一个空数组 []，以确保程序不会因为错误而中断。
    return generateOgImageMetaForPhotos(photos);
}

export default async function Gallery() {

    const [
        photos,
        photosCount,
        tags,
        cameras,
        simulations,
    ] = await Promise.all([
        getPhotosCached()
            .catch(() => []),
        getPhotosMeta()
            .then(({ count }) => count)
            .catch(() => 0),
        ...(GRID_HOMEPAGE_ENABLED
            ? getPhotoSidebarData()
            : [[], [], []]),
    ]);

    return (
      <Wrapper className="flex min-h-screen flex-col gap-6 px-6 pb-24 pt-8">
          <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新画册
          </h2>
          {
              photos.length > 0
                  ? GRID_HOMEPAGE_ENABLED
                      ? <PhotoGridPage {...{ photos, photosCount, tags, cameras, simulations }} />
                      : <PhotoFeedPage {...{ photos, photosCount }} />
                  : <PhotosEmptyState />
          }
      </Wrapper>
    )
  }
  //接收一个包含多个 Promise 的数组，并返回一个新的 Promise。当数组中的所有 Promise 都成功解决（resolve）时，它会返回一个包含每个 Promise 结果的数组。