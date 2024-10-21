'use client';

import { Photo, titleForPhoto } from '@/features/gallery/photo';
import AdminTable from './AdminTable';
import { Fragment } from 'react';
import PhotoSmall from '@/features/gallery/photo/PhotoSmall';
import { clsx } from 'clsx';
import { pathForAdminPhotoEdit, pathForPhoto } from '@/features/gallery/site/paths';
import Link from 'next/link';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import PhotoDate from '@/features/gallery/photo/PhotoDate';
import EditButton from './EditButton';
import { useAppState } from '@/features/gallery/state/AppState';
import { RevalidatePhoto } from '@/features/gallery/photo/InfinitePhotoScroll';
import PhotoSyncButton from './PhotoSyncButton';
import DeletePhotoButton from './DeletePhotoButton';

export default function AdminPhotosTable({
  photos,
  onLastPhotoVisible,
  revalidatePhoto,
  photoIdsSyncing = [],
  hasAiTextGeneration,
  showUpdatedAt,
  canEdit = true,
  canDelete = true,
}: {
  photos: Photo[],
  onLastPhotoVisible?: () => void
  revalidatePhoto?: RevalidatePhoto
  photoIdsSyncing?: string[]
  hasAiTextGeneration: boolean
  showUpdatedAt?: boolean
  canEdit?: boolean
  canDelete?: boolean
}) {
  const { invalidateSwr } = useAppState();

  const opacityForPhotoId = (photoId: string) =>
    photoIdsSyncing.length > 0 && !photoIdsSyncing.includes(photoId)
      ? 'opacity-40'
      : undefined;

  return (
    <AdminTable>
      {photos.map((photo, index) =>
        <Fragment key={photo.id}>
          <PhotoSmall
            photo={photo}
            onVisible={index === photos.length - 1
              ? onLastPhotoVisible
              : undefined}
            className={opacityForPhotoId(photo.id)}
          />
          <div className={clsx(
            'flex flex-col lg:flex-row',
            opacityForPhotoId(photo.id),
          )}>
            <Link
              key={photo.id}
              href={pathForPhoto({ photo })}
              className="lg:w-[50%] flex items-center gap-2"
              prefetch={false}
            >
              <span className={clsx(
                photo.hidden && 'text-dim',
              )}>
                {titleForPhoto(photo)}
                {photo.hidden && <span className="whitespace-nowrap">
                  {' '}
                  <AiOutlineEyeInvisible
                    className="inline translate-y-[-0.5px]"
                    size={16}
                  />
                </span>}
              </span>
              {photo.priorityOrder !== null &&
                <span className={clsx(
                  'text-xs leading-none px-1.5 py-1 rounded-sm',
                  'dark:text-gray-300',
                  'bg-gray-100 dark:bg-gray-800',
                )}>
                  {photo.priorityOrder}
                </span>}
            </Link>
            <div className={clsx(
              'lg:w-[50%] uppercase',
              'text-dim',
            )}>
              <PhotoDate {...{
                photo,
                dateType: showUpdatedAt ? 'updatedAt' : 'createdAt',
              }} />
            </div>
          </div>
          <div className={clsx(
            'flex flex-nowrap',
            'gap-2 sm:gap-3 items-center',
          )}>
            {canEdit &&
              <EditButton path={pathForAdminPhotoEdit(photo)} />}
            <PhotoSyncButton
              photoId={photo.id}
              photoTitle={titleForPhoto(photo)}
              onSyncComplete={invalidateSwr}
              isSyncingExternal={photoIdsSyncing.includes(photo.id)}
              hasAiTextGeneration={hasAiTextGeneration}
              disabled={photoIdsSyncing.length > 0}
              className={opacityForPhotoId(photo.id)}
              shouldConfirm
              shouldToast
            />
            {canDelete &&
              <DeletePhotoButton
                photo={photo}
                onDelete={() => revalidatePhoto?.(photo.id, true)}
              />}
          </div>
        </Fragment>)}
    </AdminTable>
  );
}