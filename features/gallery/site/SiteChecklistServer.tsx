import { generateAuthSecret } from '@/features/gallery/auth';
import SiteChecklistClient from './SiteChecklistClient';
import { CONFIG_CHECKLIST_STATUS } from '@/features/gallery/site/config';
import { testConnectionsAction } from '@/features/gallery/admin/actions';

export default async function SiteChecklistServer({
  simplifiedView,
}: {
  simplifiedView?: boolean
}) {
  const secret = await generateAuthSecret().catch(() => 'TRY AGAIN');
  const connectionErrors = await testConnectionsAction().catch(() => ({}));
  return (
    <SiteChecklistClient {...{
      ...CONFIG_CHECKLIST_STATUS,
      ...connectionErrors,
      simplifiedView,
      secret,
    }} />
  );
}
