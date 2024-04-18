import Link from 'next/link';

import { NICKNAME, PATHS } from '@/constants';


export const HeroSection = () => {
  let delay = 0;

  // 每次调用,增加动画开始的时间延迟
  const getDelay = () => (delay += 200);

  return (
    <div className="max-w-screen-md 2xl:max-w-7xl  gap-5 flex flex-col justify-center min-h-full px-6 md:px-10 bg-slate-500">
        首页展示内容
    </div>
  );
};
