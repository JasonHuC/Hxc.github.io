export const SITE_URL = process.env.SITE_URL;

export const DEFAULT_THEME =
    process.env.NEXT_PUBLIC_DEFAULT_THEME === 'dark'
        ? 'dark'
        : process.env.NEXT_PUBLIC_DEFAULT_THEME === 'light'
            ? 'light'
            : 'system';
// 嵌套的三元表达式：
// 第一层：检查当前环境变量是否是生产环境(production)并且不是预览环境(preview)。
// 	•	如果条件为 true，则返回 SITE_DOMAIN（生产环境的域名）。
// 	•	如果条件为 false，则进入下一层三元表达式（继续检查环境是否是预览环境）。
// 第二层：检查当前环境是否是 预览环境 (preview)。
// 	•	如果是 preview 环境，则返回 VERCEL_BRANCH_URL 或者 VERCEL_DEPLOYMENT_URL，这两个都是 Vercel 提供的用于预览的 URL。
// 	•	如果不是预览环境，则返回 'http://localhost:3000'，表示当前是在本地开发环境。

// META / SOURCE / DOMAINS



export const PHOTO_SITE_TITLE =
    process.env.NEXT_PUBLIC_SITE_TITLE ||
    'Photo Blog';
export const PHOTO_SITE_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_DOMAIN || PHOTO_SITE_TITLE;
export const PHOTO_SITE_DESCRIPTION =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    PHOTO_SITE_DOMAIN;

