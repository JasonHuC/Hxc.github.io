import AdminTagTable from '@/app/admin/gallery/AdminTagTable';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import { getUniqueTagsHiddenCached } from '@/features/gallery/photo/cache';

export default async function AdminTagsPage() {
  const tags = await getUniqueTagsHiddenCached().catch(() => []);

  return (
    <SiteGrid
      contentMain={
        <div className="space-y-6">
          <div className="space-y-4">
            <AdminTagTable {...{ tags }} />
          </div>
        </div>}
    />
  );
}
