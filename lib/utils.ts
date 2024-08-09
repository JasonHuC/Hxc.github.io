import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import relativeTime from "dayjs/plugin/relativeTime";
import slugify from 'slugify';
import { showErrorToast, showSuccessToast } from '@/app/components/ui/toast';
import { ADMIN_EMAILS } from '@/constants';
dayjs.extend(relativeTime);//这行代码导入了 relativeTime 插件。这个插件允许 Day.js 显示相对时间，例如“3小时前”或“2天后”。

export const cn = (...inputs:ClassValue[]) => {
    // clsx:合并classname
    return twMerge(clsx(inputs));//twMerge：合并 并避免tailwind的冲突
}

export const toSlug = (s: string) => {
    if (!s) {
        return '';
    }

    return slugify(s, {
        lower: true,
    });
};

export const toFromNow = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').fromNow();
};

export const copyToClipboard = (text: string) => {
    // 实测 Clipboard API 在 iPhone 上不支持，可恶！
    if (navigator.clipboard) {
        navigator.clipboard
            // 去除首尾空白字符
            .writeText(text?.trim())
            .then(() => {
                showSuccessToast('已复制到粘贴板');
            })
            .catch((error) => {
                showErrorToast(error as string);
            });
    } else {
        // 以下代码来自：https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        // 赋值，手动去除首尾空白字符
        textarea.value = text?.trim();
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        showSuccessToast('已复制到粘贴板');
        // 移除输入框
        document.body.removeChild(textarea);
    }
};
export const isBrowser = () => {
    // 代码来自：https://ahooks.js.org/zh-CN/guide/blog/ssr
    /* eslint-disable @typescript-eslint/prefer-optional-chain */
    return !!(
        typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement
    );
};
export const toSlashDateString = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').format('YYYY年M月D日 dddd HH:mm:ss');
};

export const isAdmin = (email?: string | null) => {
    if (!email || !ADMIN_EMAILS?.length) {
        return false;
    }
    return ADMIN_EMAILS.includes(email);
};