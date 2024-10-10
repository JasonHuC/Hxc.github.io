import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';
import React from "react";

export type NextLinkProps = React.ComponentProps<typeof Link>;//React.ComponentProps 接受一个组件类型，然后返回这个组件的 props 类型。

export const NextLink = ({ className, children, ...props }: NextLinkProps) => {
    return (
        <Link
            {...props}
            className={cn(
                buttonVariants({ variant: 'link' }),
                'text-muted-foreground hover:text-primary',
                className,
            )}
        >
            {children}
        </Link>
    );
};

