'use client';

import HttpStatusPage from '@/features/gallery/components/HttpStatusPage';

export default function Error() {
  return (
    <HttpStatusPage status={500}>
      Something went wrong
    </HttpStatusPage>
  );
}
