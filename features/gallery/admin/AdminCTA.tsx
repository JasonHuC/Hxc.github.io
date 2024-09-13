'use client';
//“CTA” 是 “Call to Action” 的缩写，通常指引导用户执行某个特定操作的元素或内容
// 在这里是指：根据用户是否登录，CTA 提示用户要么上传照片，要么访问管理员控制台。
import PhotoUpload from '@/features/gallery/photo/PhotoUpload';
import { PATH_ADMIN_PHOTOS } from '@/features/gallery/site/paths';
import { useAppState } from '@/features/gallery/state/AppState';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function AdminCTA() {
  const { isUserSignedIn } = useAppState();

  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex justify-center pt-4">
      {isUserSignedIn
        ? <PhotoUpload
          showUploadStatus={false}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
        : <Link
          href={PATH_ADMIN_PHOTOS}
          className="button primary"
        >
          <span>Admin Dashboard</span>
          <FaArrowRight size={10} />
        </Link>}
    </div>
  );
}
