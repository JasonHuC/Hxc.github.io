import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs:ClassValue[]) => {
    // clsx:合并classname
    return twMerge(clsx(inputs));//twMerge：合并 并避免tailwind的冲突
}