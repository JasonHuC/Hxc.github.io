import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import relativeTime from "dayjs/plugin/relativeTime";
export const cn = (...inputs:ClassValue[]) => {
    // clsx:合并classname
    return twMerge(clsx(inputs));//twMerge：合并 并避免tailwind的冲突
}
export const toFromNow = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').fromNow();
};