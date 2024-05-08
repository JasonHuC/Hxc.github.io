import React from 'react';
import Link from 'next/link';
import {Badge} from '@/app/components/ui/badge';
import {Tooltip,TooltipContent,TooltipTrigger} from '@/app/components/ui/tooltip';
import {IconSolarEyeBold} from "@/app/components/icons";
import {NICKNAME,PATHS} from "@/constants";
import {toFromNow} from "@/lib/utils";
import
type BlogListItemProps = {
    blog:Blog;
    uvMap?:Record<string, number>;
}
export default function BlogListItem(props) {
    return (
        <div></div>
    );
}

