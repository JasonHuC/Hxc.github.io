import { clsx } from 'clsx';
import { IBM_Plex_Mono } from 'next/font/google';
import {
    DEFAULT_THEME,
    PHOTO_SITE_DESCRIPTION,
    PHOTO_SITE_TITLE,
    PHOTO_SITE_DOMAIN
} from '@/config';
import AppStateProvider from '@/features/gallery/state/AppStateProvider';
import ToasterWithThemes from '@/features/gallery/toast/ToasterWithThemes';
import PhotoEscapeHandler from '@/features/gallery/photo/PhotoEscapeHandler';
import { Metadata } from 'next/types';
import { ThemeProvider } from 'next-themes';
import Nav from '@/features/gallery/site/Nav';
import Footer from '@/features/gallery/site/Footer';
import CommandK from '@/features/gallery/site/CommandK';
import SwrConfigClient from '@/features/gallery/state/SwrConfigClient';
import AdminBatchEditPanel from '@/app/admin/gallery/AdminBatchEditPanel';

import '@/features/gallery/site/global.css';
import '@/features/gallery/site/sonner.css';

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
    title: PHOTO_SITE_TITLE,
    description: PHOTO_SITE_DESCRIPTION,
    openGraph: {
        title: PHOTO_SITE_TITLE,
        description: PHOTO_SITE_DESCRIPTION,
    },
    twitter: {
        title: PHOTO_SITE_TITLE,
        description: PHOTO_SITE_DESCRIPTION,
    },
    icons: [{
        url: '/favicon.ico',
        rel: 'icon',
        type: 'image/png',
        sizes: '180x180',
    }, {
        url: '/favicons/light.png',
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
        type: 'image/png',
        sizes: '32x32',
    }, {
        url: '/favicons/dark.png',
        rel: 'icon',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
        sizes: '32x32',
    }, {
        url: '/favicons/apple-touch-icon.png',
        rel: 'icon',
        type: 'image/png',
        sizes: '180x180',
    }],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className={ibmPlexMono.variable}>
        <AppStateProvider>
            <SwrConfigClient>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={DEFAULT_THEME}
                >
                    <main className={clsx(
                        'mx-3 mb-3',
                        'lg:mx-6 lg:mb-6',
                        // Center on large screens
                        // 1280px width defined in components/SiteGrid.tsx
                        '3xl:mx-auto 3xl:w-[1280px]',
                    )}>
                        <Nav siteDomainOrTitle={PHOTO_SITE_DOMAIN} />
                        <AdminBatchEditPanel />
                        <div className={clsx(
                            'min-h-[16rem] sm:min-h-[30rem]',
                            'mb-12',
                        )}>
                            {children}
                        </div>
                        <Footer />
                    </main>
                    <CommandK />
                </ThemeProvider>
            </SwrConfigClient>
            {/*<Analytics debug={false} />*/}
            {/*<SpeedInsights debug={false}  />*/}
            <PhotoEscapeHandler />
            <ToasterWithThemes />
        </AppStateProvider>
        </div>

    );
}
