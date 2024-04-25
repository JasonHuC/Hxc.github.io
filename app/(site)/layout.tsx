import { BackToTop } from '@/app/components/back-to-top';
import { Navbar } from '@/app/components/navbar';
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="">
            <Navbar />
            <main className="min-h-[calc(100vh-190px)]">
                {children}
            </main>
            {/*后续再添加footer*/}
            <BackToTop />
        </div>
    );
}
