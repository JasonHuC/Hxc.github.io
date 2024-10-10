import {Wrapper} from "@/app/components/wrapper";
import {
    INFINITE_SCROLL_FEED_INITIAL,
    INFINITE_SCROLL_GRID_INITIAL,
    generateOgImageMetaForPhotos,
} from '@/features/gallery/photo';
import PhotosEmptyState from '@/features/gallery/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import { cache } from 'react';//用来缓存函数的结果。通过缓存的方式，可以避免不必要的重复计算，尤其是在数据请求、复杂计算等
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
      <div>
          {
              photos.length > 0
                  ? GRID_HOMEPAGE_ENABLED
                      ? <PhotoGridPage {...{ photos, photosCount, tags, cameras, simulations }} />
                      : <PhotoFeedPage {...{ photos, photosCount }} />
                  : <PhotosEmptyState />
          }
      </div>
    )
  }
  //接收一个包含多个 Promise 的数组，并返回一个新的 Promise。当数组中的所有 Promise 都成功解决（resolve）时，它会返回一个包含每个 Promise 结果的数组。