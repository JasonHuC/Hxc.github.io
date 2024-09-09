import { getUniqueTagsCached } from '@/features/gallery/photo/cache';
import AdminBatchEditPanelClient from './AdminBatchEditPanelClient';

export default async function AdminBatchEditPanel() {
  const uniqueTags = await getUniqueTagsCached();
  return (
    <AdminBatchEditPanelClient {...{ uniqueTags }} />
  );
}
