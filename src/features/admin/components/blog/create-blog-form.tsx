'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { TagTypeEnum } from '@prisma/client';

import { Button } from '@/app/components/ui/button';
import { Combobox } from '@/app/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Textarea } from '@/app/components/ui/textarea';
import {
  hideToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showSuccessToast,
} from '@/app/components/ui/toast';

import { BytemdEditor } from '@/app/components/bytemd';

import { PATHS } from '@/constants';
import { CreateTagButton } from '@/features/admin';
import {
  type CreateBlogDTO,
  createBlogSchema,
  useCreateBlog,
} from '@/features/blog';
import { useGetAllTags } from '@/features/tag';
import { uploadFile } from '@/features/upload';
import { toSlug } from '@/lib/utils';

export const CreateBlogForm = () => {
  const router = useRouter();

  const getTagsQuery = useGetAllTags(TagTypeEnum.BLOG);
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery]);

  const createBlogQuery = useCreateBlog();

  const [cover, setCover] = React.useState('');
  const form = useForm<CreateBlogDTO>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      body: '',
      published: true,
      cover: '',
      author: '',
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form autoComplete="off">
        <div className="fixed z-10 bottom-10 left-24 right-24 md:left-[20vw] md:right-[20vw]">
          <Button
            type="button"
            onClick={() => form.handleSubmit(handleSubmit)()}
            variant={'outline'}
            className="!w-full"
          >
            创建
          </Button>
        </div>

        <div className="grid gap-4 pb-24 px-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入标题" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>slug</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full gap-4">
                    <Input {...field} placeholder="请输入slug" />
                    <Button type="button" onClick={handleFormatSlug}>
                      格式化
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="请输入描述" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>作者</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="请输入作者"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>封面</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="请输入封面链接"
                  />
                </FormControl>
                <FormMessage />
                <Input
                  type="file"
                  onChange={async (e) => {
                    try {
                      const file = e.target.files?.[0];
                      if (file) {
                        const fd = new FormData();
                        fd.append('file', file);
                        const toastID = showLoadingToast('上传中');
                        const { url, error } = await uploadFile(fd);
                        hideToast(toastID);

                        if (error) {
                          showErrorToast(error);
                          return [];
                        }

                        if (url) {
                          showSuccessToast('上传成功');
                        }

                        setCover(url ?? '');
                        form.setValue('cover', url ?? '');
                      } else {
                        showInfoToast('请选择一个文件');
                      }
                    } catch (error) {
                      showErrorToast(error as string);
                    }
                  }}
                />
                {Boolean(cover) && (
                  <img
                    src={cover}
                    className="h-[300px] object-scale-down"
                    alt={''}
                  />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否发布</FormLabel>
                <FormControl>
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-10">
                      <Combobox
                        options={
                          tags?.map((el) => ({
                            label: el.name,
                            value: el.id,
                          })) ?? []
                        }
                        multiple
                        clearable
                        selectPlaceholder="请选择标签"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </div>

                    <CreateTagButton refreshAsync={getTagsQuery.refreshAsync} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <div id="content-editor">
                    <BytemdEditor
                      body={field.value}
                      setContent={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );

  async function handleSubmit(values: CreateBlogDTO) {
    await createBlogQuery.runAsync(values);
    router.push(PATHS.ADMIN_BLOG);
  }

  function handleFormatSlug() {
    const tmp = form.getValues().slug?.trim();
    if (tmp) {
      const formatted = toSlug(tmp);
      form.setValue('slug', formatted);
    }
  }
};
