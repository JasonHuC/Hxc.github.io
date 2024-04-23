import { NICKNAME } from '.';

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

  }