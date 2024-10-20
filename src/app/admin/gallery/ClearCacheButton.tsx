'use client';

import SubmitButtonWithStatus from '@/features/gallery/components/SubmitButtonWithStatus';
// 不仅能提交表单，还能够显示状态。
import { clearCacheAction } from '@/features/gallery/photo/actions';
// 表单提交时要执行的动作
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
