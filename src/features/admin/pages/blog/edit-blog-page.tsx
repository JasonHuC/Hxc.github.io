import { PageHeader } from '@/app/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, EditBlogForm } from '../../components';

export const EditBlogPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[
            PATHS.ADMIN_HOME,
            PATHS.ADMIN_BLOG,
            PATHS.ADMIN_BLOG_EDIT,
          ]}
        />
      }
    >
      <EditBlogForm />
    </AdminContentLayout>
  );
};
