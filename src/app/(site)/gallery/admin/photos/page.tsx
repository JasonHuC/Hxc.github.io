import { getStoragePhotoUrlsNoStore } from '@/features/gallery/services/storage/cache';
// 从缓存中获取照片URL，但不存储。

import { getPhotos } from '@/features/gallery/photo/db/query';
import { getPhotosMetaCached } from '@/features/gallery/photo/cache';
// 从数据库获取照片及其元数据，并使用缓存来提高性能。
// getPhotos 通常用于从数据库或数据源中获取具体的照片数据。这可能包括照片的 URL、描述、创建日期、标签、相机信息等。该函数通常返回一个包含多个照片对象的数组。
// 元数据不包含实际的照片内容，而是关于照片数据的统计信息或描述信息，比如总共有多少张照片、哪些照片过时了等等。

import { OUTDATED_THRESHOLD } from '@/features/gallery/photo';
// 标记照片为过时的阈值时间。

import AdminPhotosClient from '@/app/admin/gallery/AdminPhotosClient';
import { revalidatePath } from 'next/cache';//针对特定路径进行局部刷新，而不必刷新整个站点。

export const maxDuration = 60;//页面的最大缓存时间为60秒。

const DEBUG_PHOTO_BLOBS = false;//本地开发时，你可以使用DEBUG_PHOTO_BLOBS调试存储的照片Blob URL。

const INFINITE_SCROLL_INITIAL_ADMIN_PHOTOS = 25;
const INFINITE_SCROLL_MULTIPLE_ADMIN_PHOTOS = 50;
// 初始化加载的照片数量和后续每次加载的照片数量。

export default async function AdminPhotosPage() {
    const [
        photos,
        photosCount,
        photosCountOutdated,
        blobPhotoUrls,//用于调试模式下显示照片的链接。
    ] = await Promise.all([//Promise.all 并行获取多个数据源，包括照片列表、照片总数、过时照片数量和（在调试模式下的）照片Blob URL。
        getPhotos({
            hidden: 'include',
            sortBy: 'createdAt',
            limit: INFINITE_SCROLL_INITIAL_ADMIN_PHOTOS,
        }).catch(() => []),//请求一
        getPhotosMetaCached({ hidden: 'include'})
            .then(({ count }) => count)
            .catch(() => 0),//请求二：获取包括隐藏照片在内的所有照片的总数。
        getPhotosMetaCached({
            hidden: 'include',
            updatedBefore: OUTDATED_THRESHOLD,
        })
            .then(({ count }) => count)
            .catch(() => 0),//请求三：获取的是包括隐藏照片在内且更新日期早于 OUTDATED_THRESHOLD 的照片的数量。
        DEBUG_PHOTO_BLOBS
            ? getStoragePhotoUrlsNoStore()
            : [],//请求四
        // blobPhotoUrls 变量会在调试模式 (DEBUG_PHOTO_BLOBS = true) 下，
        // 调用 getStoragePhotoUrlsNoStore() 函数从存储服务获取这些照片的URL。否则，这个变量将只是一个空数组。
    ]);

    return (
        <AdminPhotosClient {...{
            photos,
            photosCount,
            photosCountOutdated,
            onLastPhotoUpload: async () => {//最后一张照片上传后的操作
                'use server';
                // Update upload count in admin nav
                revalidatePath('/admin', 'layout');
            //     type为page时：当页面内容（例如数据或 UI）发生变化，需要重新渲染整个页面的情况。
            //     type为layout时，当页面的布局（而不是具体内容）发生变化时，例如导航菜单更新或其他全局 UI 元素的变化。
            },
            blobPhotoUrls,
            infiniteScrollInitial: INFINITE_SCROLL_INITIAL_ADMIN_PHOTOS,
            infiniteScrollMultiple: INFINITE_SCROLL_MULTIPLE_ADMIN_PHOTOS,
        }} />
    );
}

