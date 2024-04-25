import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { NICKNAME, PATHS } from '@/constants';
import { TypeIntro } from '@/app/home/components/type-intro';
import { cn } from '@/lib/utils';


export const HeroSection = () => {
  let delay = 0;

  // 每次调用,增加动画开始的时间延迟
  const getDelay = () => (delay += 200);

  return (
      <div
          className="max-w-screen-md 2xl:max-w-7xl  gap-5 flex flex-col justify-center min-h-full px-6 md:px-10">
          <p
              className="text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out"
              style={{
                  animationDelay: `${getDelay()}ms`,//内联样式在React中实际上是通过JavaScript对象来表示的，而不是普通的CSS字符串。需要使用JavaScript对象的属性访问规则（即使用驼峰命名法），而非CSS的短横线命名法
              }}
          >
              Hi, I'm
          </p>
          <strong
              className={cn(
                  `text-5xl md:text-8xl tracking-widest font-black  bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`,
                  'animate-fade-up animate-ease-in-out',
              )}
              style={{
                  WebkitTextFillColor: 'transparent',
                  animationDelay: `${getDelay()}ms`,
              }}
          >
              {NICKNAME}
          </strong>
          <div
              className={cn('animate-fade-up animate-ease-in-out')}
              style={{
                  animationDelay: `${getDelay()}ms`,
              }}
          >
              <TypeIntro/>
          </div>
          <p
              className={cn(
                  'text-2xl md:text-5xl tracking-widest',
                  'animate-fade-up animate-ease-in-out',
              )}
              style={{
                  animationDelay: `${getDelay()}ms`,
                  // whiteSpace: 'nowrap',
                  lineHeight: '1.5', // 调整为希望的行距值
              }}
          >
              Focused on
              <span> </span>
              <span className={`font-semibold text-[#00d8ff]`}>React</span>、
              <span className={`font-semibold text-[#00b4e0]`}>Vue</span> and
              <span> </span>
              <span className={`font-semibold text-[#007acc]`}>TypeScript.</span>
              <span className="ml-4">\owo/ ~</span>
          </p>
          <p
              className={cn(
                  'text-base md:text-2xl text-muted-foreground tracking-widest',
                  'animate-fade-up animate-ease-in-out',
              )}
              style={{
                  animationDelay: `${getDelay()}ms`,
              }}
          >
              Welcome to my blog👋, where you can witness my technical growth and accumulation of skills!✍️
          </p>
          {/*<div*/}
          {/*    className={cn('flex space-x-4', 'animate-fade-up animate-ease-in-out')}*/}
          {/*    style={{*/}
          {/*        animationDelay: `${getDelay()}ms`,*/}
          {/*    }}*/}
          {/*>*/}
          {/*    <Link*/}
          {/*        href={PATHS.SITE_BLOG}*/}
          {/*        className={cn(buttonVariants({variant: 'outline'}))}*/}
          {/*    >*/}
          {/*        我的博客*/}
          {/*    </Link>*/}
          {/*    <Link*/}
          {/*        href={PATHS.SITE_ABOUT}*/}
          {/*        className={cn(buttonVariants({variant: 'outline'}))}*/}
          {/*    >*/}
          {/*        关于我*/}
          {/*    </Link>*/}
          {/*</div>*/}

          {/*<ul*/}
          {/*    className={cn('flex space-x-4', 'animate-fade-up animate-ease-in-out')}*/}
          {/*    style={{*/}
          {/*        animationDelay: `${getDelay()}ms`,*/}
          {/*    }}*/}
          {/*>*/}
          {/*    {socialMediaList.map((el) => (*/}
          {/*        <li key={el.link}>*/}
          {/*            <Tooltip>*/}
          {/*                <TooltipTrigger asChild>*/}
          {/*                    <Button asChild variant="outline" size="icon">*/}
          {/*                        <Link href={el.link} target="_blank">*/}
          {/*                            {el.icon}*/}
          {/*                        </Link>*/}
          {/*                    </Button>*/}
          {/*                </TooltipTrigger>*/}
          {/*                <TooltipContent>{el.label}</TooltipContent>*/}
          {/*            </Tooltip>*/}
          {/*        </li>*/}
          {/*    ))}*/}
          {/*</ul>*/}
      </div>
  );
};
