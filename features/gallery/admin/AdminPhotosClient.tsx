'use client'
//在 Next.js 中，当你使用 use client 指令时，传递给客户端组件的 props 必须是可序列化的。也就是说，所有传递给客户端组件的属性都需要能够转换为 JSON 格式。这就排除了像函数、Date 对象、Map、Set 等非序列化数据类型的使用。
// 序列化： 把数据从内存中的对象转换为字节流或字符串形式，以便将其存储在文件、数据库或通过网络传输。
// 最常见的序列化格式是 JSON（JavaScript Object Notation），但也有其他格式，比如 XML、YAML、二进制等。
// 反序列化：将字节流或字符串形式的数据重新转换为内存中的对象，恢复原始的数据结构。
// 例如，将一个对象转化成json字符串的过程就是序列化：JSON.stringify(user);

// 为什么use client的代码环境中，react组件不能接受非序列化prop：
// use client环境下，代码需要在浏览器中执行
import PhotoUpload from '@/features/gallery/photo/PhotoUpload';
import { clsx } from 'clsx';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import { AI_TEXT_GENERATION_ENABLED, PRO_MODE_ENABLED } from '@/features/gallery/site/config';
import AdminPhotosTable from '@/features/gallery/admin/AdminPhotosTable';
import AdminPhotosTableInfinite from '@/features/gallery/admin/AdminPhotosTableInfinite';
import PathLoaderButton from '@/features/gallery/components/primitives/PathLoaderButton';
import { PATH_ADMIN_OUTDATED } from '@/features/gallery/site/paths';
import { Photo } from '@/features/gallery/photo';
import { StorageListResponse } from '@/features/gallery/services/storage';
import { useState } from 'react';
import { LiaBroomSolid } from 'react-icons/lia';
import AdminUploadsTable from './AdminUploadsTable';

export default function AdminPhotosClient({
  photos,
  photosCount,
  photosCountOutdated,
  onLastPhotoUpload,
  blobPhotoUrls,
  infiniteScrollInitial,
  infiniteScrollMultiple,
}: {
  photos: Photo[]
  photosCount: number
  photosCountOutdated: number
  onLastPhotoUpload: () => Promise<void>
  blobPhotoUrls: StorageListResponse
  infiniteScrollInitial: number
  infiniteScrollMultiple: number
}) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <SiteGrid
      contentMain={
        <div className="space-y-4">
          <div className="flex">
            <div className="grow min-w-0">
              <PhotoUpload
                shouldResize={!PRO_MODE_ENABLED}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                onLastUpload={onLastPhotoUpload}
              />
            </div>
            {photosCountOutdated > 0 && <PathLoaderButton
              path={PATH_ADMIN_OUTDATED}
              icon={<LiaBroomSolid size={18} className="translate-y-[-1px]" />}
              title={`${photosCountOutdated} Outdated Photos`}
              className={clsx(
                isUploading && 'hidden md:inline-flex',
              )}
              hideTextOnMobile={false}
            >
              {photosCountOutdated}
            </PathLoaderButton>}
          </div>
          {blobPhotoUrls.length > 0 &&
            <div className={clsx(
              'border-b pb-6',
              'border-gray-200 dark:border-gray-700',
              'space-y-4',
            )}>
              <div className="font-bold">
                Photo Blobs ({blobPhotoUrls.length})
              </div>
              <AdminUploadsTable urlAddStatuses={blobPhotoUrls} />
            </div>}
          {/* Use custom spacing to address gap/space-y compatibility quirks */}
          <div className="space-y-[6px] sm:space-y-[10px]">
            <AdminPhotosTable
              photos={photos}
              hasAiTextGeneration={AI_TEXT_GENERATION_ENABLED}
            />
            {photosCount > photos.length &&
              <AdminPhotosTableInfinite
                initialOffset={infiniteScrollInitial}
                itemsPerPage={infiniteScrollMultiple}
                hasAiTextGeneration={AI_TEXT_GENERATION_ENABLED}
              />}
          </div>
        </div>}
    />
  );
}
