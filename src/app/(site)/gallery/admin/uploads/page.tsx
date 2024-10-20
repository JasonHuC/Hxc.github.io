import { getStorageUploadUrlsNoStore } from '@/features/gallery/services/storage/cache';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import { getUniqueTagsCached } from '@/features/gallery/photo/cache';
import AdminUploadsClient from '@/app/admin/gallery/AdminUploadsClient';

export const maxDuration = 300;

export default async function AdminUploadsPage() {
    const urls = await getStorageUploadUrlsNoStore();
    const uniqueTags = await getUniqueTagsCached();
    return (
        <SiteGrid
            contentMain={
                <AdminUploadsClient {...{
                    urls,
                    uniqueTags,
                }} />}
        />
    );
}
