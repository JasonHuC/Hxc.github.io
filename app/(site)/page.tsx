// import { IntroScrollMouse } from 'app/components/intro-scroll-mouse';

import { HeroSection } from '@/app/home/components/hero-section';

export const revalidate = 60;

export default function Page() {
  return (
    <div className="h-[calc(100vh-64px)] grid place-content-center relative">
    
      <HeroSection />
      <div className="grid place-content-center absolute bottom-8 md:bottom-12 inset-x-0">
      </div>
    </div>
  );
}
