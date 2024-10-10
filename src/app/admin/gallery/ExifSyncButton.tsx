'use client';

import LoaderButton from '@/features/gallery/components/primitives/LoaderButton';
import SubmitButtonWithStatus from '@/features/gallery/components/SubmitButtonWithStatus';
import { getExifDataAction } from '@/features/gallery/photo/actions';
import { PhotoFormData } from '@/features/gallery/photo/form';
import IconGrSync from '@/features/gallery/site/IconGrSync';
import { clsx } from 'clsx';
import { ComponentProps, useState } from 'react';

export default function ExifSyncButton({
  photoUrl,
  onSync,
}: {
  photoUrl: string
  onSync?: (data: Partial<PhotoFormData>) => void
} & ComponentProps<typeof SubmitButtonWithStatus>) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderButton
      title="Update photo from original file"
      isLoading={isLoading}
      onClick={() => {
        setIsLoading(true);
        getExifDataAction(photoUrl)
          .then(onSync)
          .finally(() => setIsLoading(false));
      }}
      icon={<IconGrSync
        className={clsx(
          'translate-y-[0.5px] translate-x-[0.5px]',
          'sm:translate-x-[-0.5px]',
        )} />}
    >
      EXIF
    </LoaderButton>
  );
}
