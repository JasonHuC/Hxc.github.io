import { z } from 'zod';

export const createBlogSchema = z.object({
  // title: z.string().min(1, { message: '长度不能少于1个字符' }),
  // slug: z
  //   .string()
  //   .regex(REGEX.SLUG, {
  //     message: '只允许输入数字、小写字母和中横线',
  //   })
  //   .min(1, { message: '长度不能少于1个字符' }),
  // description: z.string().min(1, { message: '长度不能少于1个字符' }),
  // cover: z.string().nullable().optional(),
  // author: z.string().nullable().optional(),
  // body: z.string().min(1, { message: '长度不能少于1个字符' }),
  // published: z.boolean().optional(),
  // tags: z.string().array().optional(),
});