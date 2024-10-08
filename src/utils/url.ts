// 提取 url 中顶级域名
// eg: https://www.example.com/path/to/page => example.com
// eg: https://space.bilibili.com/xxxxx => bilibili.com
export const extractDomainFromUrl = (urlString: string) => {
    const url = new URL(urlString);
    const hostnameParts = url.hostname.split('.');
    if (hostnameParts.length >= 2) {
        return hostnameParts.slice(-2).join('.');
    } else {
        return url.hostname;
    }
};

// Remove protocol, www, and trailing slash from url
export const shortenUrl = (url?: string) => url
    ? url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .replace(/\/$/, '')
    : undefined;

// Add protocol to url and remove trailing slash
export const makeUrlAbsolute = (url?: string) => url !== undefined
    ? (!url.startsWith('http') ? `https://${url}` : url)
        .replace(/\/$/, '')
    : undefined;
