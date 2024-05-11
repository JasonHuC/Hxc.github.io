'use server';

import { type Prisma } from '@prisma/client';
import { isUndefined } from 'lodash-es';

import { ERROR_NO_PERMISSION, PUBLISHED_MAP } from '@/constants';
// import { batchGetBlogUV } from '@/features/statistics';
// import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';

import {
    type CreateBlogDTO,
    type UpdateBlogDTO,
    type GetBlogsDTO,
    createBlogSchema,
    updateBlogSchema,
    getBlogsSchema,
} from "../types";

export const isBlogExistById = async (id:string):Promise<boolean> => {
    const isExist = await prisma.blog.findUnique(
        {
            where:{id}
        }
    );
    return Boolean(isExist);
}

export const getBlogs = async (params:GetBlogsDTO)=>{
    const result = await getBlogsSchema.safeParseAsync(params);
    if(!result.success){
        const error = result.error.format()._errors?.join(';');
        throw new Error(error);//记录日志
    }
}