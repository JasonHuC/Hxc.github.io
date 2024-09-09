'use client';

import { ReactNode } from 'react';
import { Photo, PhotoSetAttributes, titleForPhoto } from '@/features/gallery/photo';
import Link from 'next/link';
import { AnimationConfig } from '../components/AnimateItems';
import { useAppState } from '@/features/gallery/state/AppState';
import { pathForPhoto } from '@/features/gallery/site/paths';
import { clsx } from 'clsx';

export default function PhotoLink({
  photo,
  tag,
  camera,
  simulation,
  focal,
  scroll,
  prefetch,
  nextPhotoAnimation,
  className,
  children,
}: {
  photo?: Photo
  scroll?: boolean
  prefetch?: boolean
  nextPhotoAnimation?: AnimationConfig
  className?: string
  children?: ReactNode
} & PhotoSetAttributes) {
  const { setNextPhotoAnimation } = useAppState();
  
  return (
    photo
      ? <Link
        href={pathForPhoto({ photo, tag, camera, simulation, focal })}
        prefetch={prefetch}
        onClick={() => {
          if (nextPhotoAnimation) {
            setNextPhotoAnimation?.(nextPhotoAnimation);
          }
        }}
        className={className}
        scroll={scroll}
      >
        {children ?? titleForPhoto(photo)}
      </Link>
      : <span className={clsx(
        'text-gray-300 dark:text-gray-700 cursor-default',
        className,
      )}>
        {children ?? (photo ? titleForPhoto(photo) : undefined)}
      </span>
  );
};
