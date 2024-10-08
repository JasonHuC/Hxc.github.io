import { NICKNAME } from './index';

export const PATHS = {
    /** ************* SITE ****************** */
    SITE_HOME: '/',
    SITE_BLOG: '/blog',
    SITE_SNIPPET: '/snippet',
    SITE_ABOUT: '/about',
    SITE_GALLERY: '/gallery',
    SITEMAP: '/sitemap.xml',
  
    /** ************* ADMIN ****************** */
    ADMIN_HOME: '/admin',
    ADMIN_STATISTIC: '/admin/statistic',
  
    ADMIN_BLOG: '/admin/blog',
    ADMIN_BLOG_CREATE: '/admin/blog/create',
    ADMIN_BLOG_EDIT: '/admin/blog/edit',
  
    ADMIN_SNIPPET: '/admin/snippet',
    ADMIN_SNIPPET_CREATE: '/admin/snippet/create',
    ADMIN_SNIPPET_EDIT: '/admin/snippet/edit',
  
    ADMIN_TAG: '/admin/tag',
    ADMIN_NOTE: '/admin/note',
  
    /** ************* AUTH ****************** */
    AUTH_SIGNIN: '/auth/signin',
    NEXT_AUTH_SIGNIN: '/api/auth/signin',
  };

  export const PATHS_MAP: Record<string, string> = {
    /** ************* SITE ****************** */
    [PATHS.SITE_HOME]: 'Home',
    [PATHS.SITE_BLOG]: 'Blog',
    [PATHS.SITE_SNIPPET]: 'Snippet',
    [PATHS.SITE_ABOUT]: 'About',
    [PATHS.SITE_GALLERY]: 'Gallery',
    [PATHS.SITEMAP]: 'Sitemap',
  
    /** ************* ADMIN ****************** */
    [PATHS.ADMIN_HOME]: 'Home',
    [PATHS.ADMIN_STATISTIC]: 'Statistic',
    [PATHS.ADMIN_BLOG]: 'Blog',
    [PATHS.ADMIN_BLOG_CREATE]: 'Create Blog',
    [PATHS.ADMIN_BLOG_EDIT]: 'Edit Blog',
    [PATHS.ADMIN_SNIPPET]: 'Snippet',
    [PATHS.ADMIN_SNIPPET_CREATE]: 'Create Snippet',
    [PATHS.ADMIN_SNIPPET_EDIT]: 'Edit Snippet',
    [PATHS.ADMIN_TAG]: 'Tag',
    [PATHS.ADMIN_NOTE]: 'Note',
  
    /** ************* AUTH ****************** */
    [PATHS.AUTH_SIGNIN]: 'Sign in',
  };

  export const PATH_DESCRIPTION_MAP: Record<string, string> = {
      /** ************* SITE ****************** */
      [PATHS.SITE_HOME]: "首页",
      [PATHS.SITE_BLOG]: "这里记录了我的想法、文章，希望和大家一起交流～",
      [PATHS.SITE_SNIPPET]: "多是一些零零碎碎的片段，通常是代码片段",
      [PATHS.SITE_ABOUT]: `叮～ 你有一份关于${NICKNAME}的简介，请查收～`,
      [PATHS.SITE_GALLERY]: "这里是个人摄影日记📷，收录日常的美好瞬间。",

      /** ************* ADMIN ****************** */
      [PATHS.ADMIN_HOME]: "欢迎回来，要努力学习嗷～",
      [PATHS.ADMIN_STATISTIC]: "聚合本站的所有统计数据",
      [PATHS.ADMIN_BLOG]: `博客管理，在这里对 博客进行 增、删、改、查操作`,
      [PATHS.ADMIN_BLOG_CREATE]: "在这里尽情地创作吧！",
      [PATHS.ADMIN_BLOG_EDIT]:
          "世界破破烂烂，博客修修补补，好的文章总是需要反复打磨的",
      [PATHS.ADMIN_SNIPPET]: `片段管理，在这里对片段进行 增、删、改、查操作`,
      [PATHS.ADMIN_SNIPPET_CREATE]:
          "Talk is cheap. Show me the code. From Linus Torvalds",
      [PATHS.ADMIN_SNIPPET_EDIT]: "修修补补，总比没有好",
      [PATHS.ADMIN_TAG]: `标签管理，在这里对标签进行 增、删、改、查操作`,
      [PATHS.ADMIN_NOTE]: "好记性不如烂笔头，灵感一闪",

      /** ************* AUTH ****************** */
      [PATHS.AUTH_SIGNIN]: "登录",
  }