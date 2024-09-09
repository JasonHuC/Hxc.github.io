'use client';

import SubmitButtonWithStatus from '@/features/gallery/components/SubmitButtonWithStatus';
import { clearCacheAction } from '@/features/gallery/photo/actions';
import { useAppState } from '@/features/gallery/state/AppState';
import { BiTrash } from 'react-icons/bi';

export default function ClearCacheButton() {
  const { invalidateSwr } = useAppState();

  return (
    <form action={clearCacheAction}>
      <SubmitButtonWithStatus
        icon={<BiTrash size={16} />}
        onFormSubmit={invalidateSwr}
      >
        Clear Cache
      </SubmitButtonWithStatus>
    </form>
  );
}
