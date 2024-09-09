import React from 'react';
import Link from 'next/link';
import {Badge} from '@/app/components/ui/badge';
import {Tooltip,TooltipContent,TooltipTrigger} from '@/app/components/ui/tooltip';
import {IconSolarEyeBold} from "@/app/components/icons";
import {NICKNAME,PATHS} from "@/constants";
import {toFromNow} from "@/lib/utils";
import {formatNum} from "@/utils";
import {type GalleryPost} from '../types'
type GalleryPostListItemProps = {
    galleryPost:GalleryPost;
    uvMap?:Record<string, number>;
}
export const GalleryPostListItem = ({galleryPost,uvMap}: GalleryPostListItemProps) => {
    return (
        <Link
            key={galleryPost.id}
            href={`${PATHS.SITE_GALLERY}/${galleryPost.slug}`}
            className="rounded-2xl border flex items-center p-6 transition-[border] hover:border-primary h-full"
        >
            <div className="grid gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <h3 className="text-lg md:text-2xl font-semibold line-clamp-1">
                            {galleryPost.title}
                        </h3>
                    </TooltipTrigger>
                    <TooltipContent>{galleryPost.title}</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {galleryPost.description}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>{galleryPost.description}</TooltipContent>
                </Tooltip>
                <div className="text-sm text-muted-foreground flex items-center space-x-2">
                    <span>{galleryPost.author ? galleryPost.author : NICKNAME}</span>
                    <span>·</span>
                    <span>{toFromNow(galleryPost.createdAt)}</span>
                    <span>·</span>
                    <div className="flex items-center space-x-1">
                        <IconSolarEyeBold/>
                        <span>{formatNum(uvMap?.[galleryPost.id])}</span>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    {galleryPost.tags?.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)}
                </div>
            </div>
        </Link>
    )
        ;
}

