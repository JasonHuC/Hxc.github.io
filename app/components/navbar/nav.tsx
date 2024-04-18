import React from "react";
import Link from 'next/link';
import { NICKNAME, PATHS, SOURCE_CODE_GITHUB_PAGE, WEBSITE } from '@/constants';
export const Navbar = () => {
    return (
        <header>
            <div>
                {/* <NextLink> */}
                    <span>
                        {WEBSITE}
                    </span>
                {/* </NextLink> */}
                <div>
                    navitems
                </div>
                <div>
                    <Link
                    href=''>
                    </Link>
                </div>
            </div>
        </header>
    )
}