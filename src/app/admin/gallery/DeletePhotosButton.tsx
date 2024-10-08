'use client';

import LoaderButton from '@/features/gallery/components/primitives/LoaderButton';
import { photoQuantityText } from '@/features/gallery/photo';
import { deletePhotosAction } from '@/features/gallery/photo/actions';
import { useAppState } from '@/features/gallery/state/AppState';
import { toastSuccess, toastWarning } from '@/features/gallery/toast';
import { ComponentProps, useState } from 'react';
import DeleteButton from './DeleteButton';

export default function DeletePhotosButton({
  photoIds = [],
  onDelete,
  clearLocalState = true,
  onClick,
  onFinish,
  confirmText,
  toastText,
  ...rest
}: {
  photoIds?: string[]
  onClick?: () => void
  onFinish?: () => void
  onDelete?: () => void
  clearLocalState?: boolean
  toastText?: string
} & ComponentProps<typeof LoaderButton>) {
  const [isLoading, setIsLoading] = useState(false);

  const photosText = photoQuantityText(photoIds.length, false, false);

  const { invalidateSwr, registerAdminUpdate } = useAppState();

  return (
    <DeleteButton
      {...rest}
      isLoading={isLoading}
      // eslint-disable-next-line max-len
      confirmText={confirmText ?? `Are you sure you want to delete ${photosText}? This action cannot be undone.`}
      onClick={() => {
        onClick?.();
        setIsLoading(true);
        deletePhotosAction(photoIds)
          .then(() => {
            toastSuccess(toastText ?? `${photosText} deleted`);
            if (clearLocalState) {
              invalidateSwr?.();
              registerAdminUpdate?.();
            }
            onDelete?.();
          })
          .catch(() => toastWarning(`Failed to delete ${photosText}`))
          .finally(() => {
            setIsLoading(false);
            onFinish?.();
          });
      }}
    />
  );
}
