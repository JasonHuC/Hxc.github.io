'use client';

import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {NICKNAME, PATHS, SOURCE_CODE_GITHUB_PAGE, WEBSITE} from "@/constants";
import {navItems} from "./config";
import {IconBarandGithub, IconSolarUserHeartBold} from '../icons';
import {NextLink} from '../next-link';
import {Button} from "@/app/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTriggerStyle,
} from "@/app/components/navbar/navigation-menu";

export const Navbar = () => {
    return (
        <header className={cn(
            'w-full sticky border-x-0 top-0 flex justify-center backdrop-blur transition-[background-color,border-width] z-10 ,(scroll?.top ?? 0) > 60 && \'bg-background/50 border-b border-border/50'//未添加：backdrop-blur transition-[background-color,border-width] z-10 ,(scroll?.top ?? 0) > 60 && 'bg-background/50 border-b border-border/50',
        )}>
            <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl"
            >
                <NextLink
                    href={PATHS.SITE_HOME}
                    className={cn('mr-4 hidden sm:flex')}
                >
                    <span className="ml-2 font-semibold text-primary text-base">{WEBSITE}</span>
                </NextLink>
                <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-6 text-base font-medium mr-8">
                    <NavigationMenu className="list-none">
                        {navItems.map((el) => (
                            <NavigationMenuItem key={el.link}>
                                <Link href={el.link} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            NavigationMenuTriggerStyle(),
                                            'bg-transparent',
                                        )}
                                    >
                                        {el.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 sm:flex-none justify-end items-center gap-2">
                    <Link
                        href={SOURCE_CODE_GITHUB_PAGE}
                        target="_blank" //在浏览器中打开新的窗口
                        title={SOURCE_CODE_GITHUB_PAGE} //鼠标悬停在link上时显示的信息
                        // aria-label={SOURCE_CODE_GITHUB_PAGE} //屏幕阅读器会读出该内容，方便视障人群了解具体功能
                    >
                        {/* 里面放GitHub图标的按钮 */}
                        <Button variant="outline" size={'icon'} aria-label="Github Icon">
                            <IconBarandGithub className="text-base"/>
                        </Button>
                    </Link>
                    <Link
                        href={PATHS.ADMIN_HOME}
                        target="_blank"
                        rel="nofollow"//搜索引擎优化方面的
                        title="backend admin system"
                        // aria-label={PATHS.ADMIN_HOME}
                    >
                        {/* 里面放后台管理的图标按钮 */}
                        <Button variant="outline" size={'icon'} aria-label="admin system">
                            <IconSolarUserHeartBold className="text-base"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
