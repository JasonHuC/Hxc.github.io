import ClearCacheButton from '@/app/admin/gallery/ClearCacheButton';
import Container from '@/features/gallery/components/Container';
import SiteGrid from '@/features/gallery/components/SiteGrid';
import SiteChecklist from '@/features/gallery/site/SiteChecklist';

export default async function AdminConfigurationPage() {
  return (
    <SiteGrid
      contentMain={
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-grow">
              App Configuration
            </div>
            <ClearCacheButton />
          </div>
          <Container spaceChildren={false}>
            <SiteChecklist />
          </Container>
        </div>}
    />
  );
}
