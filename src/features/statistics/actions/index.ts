"use server";

import dayjs from "dayjs";

import {
  REDIS_BLOG_UNIQUE_VISITOR,
  REDIS_PAGE_VIEW,
  REDIS_PAGE_VIEW_TODAY,
  REDIS_SNIPPET_UNIQUE_VISITOR,
  REDIS_UNIQUE_VISITOR,
  REDIS_UNIQUE_VISITOR_TODAY,
  REDIS_GALLERY_UNIQUE_VISITOR,
} from "@/constants";
import { redis } from "@/lib/redis";

export const recordPV = async () => {
  const todayKey = dayjs().format("YYYY-MM-DD");//使用dayjs获取今天的日期，并格式化为YYYY-MM-DD格式。
  await redis.incr(`${REDIS_PAGE_VIEW_TODAY}:${todayKey}`);//使用Redis的incr命令为今天的页面浏览量加1。

  const pv = await redis.get(REDIS_PAGE_VIEW);

  if (pv) {
    await redis.incr(REDIS_PAGE_VIEW);
  } else {
    await redis.set(REDIS_PAGE_VIEW, 1);
  }
};

export const getSiteStatistics = async () => {
  // 总
  const pv = await redis.get(REDIS_PAGE_VIEW);
  const uv = await redis.scard(REDIS_UNIQUE_VISITOR);

  // 今日
  const todayKey = dayjs().format("YYYY-MM-DD");
  const todayPV = await redis.get(`${REDIS_PAGE_VIEW_TODAY}:${todayKey}`);
  const todayUV = await redis.scard(
      `${REDIS_UNIQUE_VISITOR_TODAY}:${todayKey}`,
  );

  return { pv, uv, todayUV, todayPV };
};

export const recordUV = async (cid?: string) => {
  if (!cid) {
    return;
  }

  const todayKey = dayjs().format("YYYY-MM-DD");
  await redis.sadd(`${REDIS_UNIQUE_VISITOR_TODAY}:${todayKey}`, cid);
  await redis.sadd(REDIS_UNIQUE_VISITOR, cid);
};

export const recordBlogUV = async (blogID?: string, cid?: string) => {
  if (!blogID || !cid) {
    return;
  }
  await redis.sadd(`${REDIS_BLOG_UNIQUE_VISITOR}:${blogID}`, cid);
};

export const getBlogUV = async (blogID?: string) => {
  if (!blogID) {
    return;
  }
  const uv = await redis.scard(`${REDIS_BLOG_UNIQUE_VISITOR}:${blogID}`);
  return uv;
};

export const batchGetBlogUV = async (blogIDs?: string[]) => {
  if (!blogIDs?.length) {
    return;
  }

  const m = new Map<string, number>();

  const uvs = await Promise.all(
      blogIDs.map((el) => redis.scard(`${REDIS_BLOG_UNIQUE_VISITOR}:${el}`)),
  );
  let idx = 0;
  for (const uv of uvs) {
    m.set(blogIDs[idx]!, uv);
    idx++;
  }

  return m;
};

export const recordSnippetUV = async (snippetID?: string, cid?: string) => {
  if (!snippetID || !cid) {
    return;
  }
  await redis.sadd(`${REDIS_SNIPPET_UNIQUE_VISITOR}:${snippetID}`, cid);
};

export const getSnippetUV = async (snippetID?: string) => {
  if (!snippetID) {
    return;
  }
  const uv = await redis.scard(`${REDIS_SNIPPET_UNIQUE_VISITOR}:${snippetID}`);
  return uv;
};

export const batchGetSnippetUV = async (snippetIDs?: string[]) => {
  if (!snippetIDs?.length) {
    return;
  }

  const m = new Map<string, number>();

  const uvs = await Promise.all(
      snippetIDs.map((el) =>
          redis.scard(`${REDIS_SNIPPET_UNIQUE_VISITOR}:${el}`),
      ),
  );
  let idx = 0;
  for (const uv of uvs) {
    m.set(snippetIDs[idx]!, uv);
    idx++;
  }

  return m;
};

export const getGalleryUV = async (galleryID?: string) => {
  if (!galleryID) {
    return;
  }
  const uv = await redis.scard(`${REDIS_GALLERY_UNIQUE_VISITOR}:${galleryID}`);
}