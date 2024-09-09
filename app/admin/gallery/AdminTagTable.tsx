import FormWithConfirm from '@/features/gallery/components/FormWithConfirm';
import { deletePhotoTagGloballyAction } from '@/features/gallery/photo/actions';
import AdminTable from '@/features/gallery/admin/AdminTable';
import { Fragment } from 'react';
import DeleteFormButton from '@/features/gallery/admin/DeleteFormButton';
import { photoQuantityText } from '@/features/gallery/photo';
import { Tags, formatTag, sortTagsObject } from '@/features/gallery/tag';
import EditButton from '@/features/gallery/admin/EditButton';
import { pathForAdminTagEdit } from '@/features/gallery/site/paths';
import { clsx } from 'clsx';
import AdminTagBadge from './AdminTagBadge';

export default function AdminTagTable({
  tags,
}: {
  tags: Tags
}) {
  return (
    <AdminTable>
      {sortTagsObject(tags).map(({ tag, count }) =>
        <Fragment key={tag}>
          <div className="pr-2 col-span-2">
            <AdminTagBadge {...{ tag, count }} />
          </div>
          <div className={clsx(
            'flex flex-nowrap',
            'gap-2 sm:gap-3 items-center',
          )}>
            <EditButton path={pathForAdminTagEdit(tag)} />
            <FormWithConfirm
              action={deletePhotoTagGloballyAction}
              confirmText={
                // eslint-disable-next-line max-len
                `Are you sure you want to remove "${formatTag(tag)}" from ${photoQuantityText(count, false).toLowerCase()}?`}
            >
              <input type="hidden" name="tag" value={tag} />
              <DeleteFormButton clearLocalState />
            </FormWithConfirm>
          </div>
        </Fragment>)}
    </AdminTable>
  );
}
