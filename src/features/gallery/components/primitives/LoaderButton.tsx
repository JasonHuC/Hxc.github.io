'use client';

import Spinner, { SpinnerColor } from '@/features/gallery/components/Spinner';
import { clsx } from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export default function LoaderButton(props: {
    isLoading?: boolean;                // 是否显示加载状态
    icon?: ReactNode;                   // 按钮上的图标
    spinnerColor?: SpinnerColor;        // 加载动画的颜色
    styleAs?: 'button' | 'link' | 'link-without-hover';  // 按钮的样式类型（默认是 'button'）
    hideTextOnMobile?: boolean;         // 是否在移动设备上隐藏文字
    confirmText?: string;               // 点击按钮时显示的确认信息
    shouldPreventDefault?: boolean;     // 是否阻止默认点击行为
    primary?: boolean;                  // 按钮是否为主样式
} & ButtonHTMLAttributes<HTMLButtonElement>) {//额外的按钮属性通过继承 ButtonHTMLAttributes<HTMLButtonElement>，例如 onClick、disabled、type 等。
  const {
    children,
    isLoading,
    icon,
    spinnerColor,
    styleAs = 'button',
    hideTextOnMobile = true,
    confirmText,
    shouldPreventDefault,
    primary,
    type = 'button',
    onClick,
    disabled,
    className,
    ...rest//这是一个omit工具类，会自动省略前者参数类型中的后者属性
  } = props;//解构props

  return (
    <button
      {...rest}
      type={type}
      onClick={e => {
        if (shouldPreventDefault) { e.preventDefault(); }
        if (!confirmText || confirm(confirmText)) {
          onClick?.(e);//这里的onclick是外部传入的属性
            //?. 是可选链操作符，确保如果 onClick 未定义，不会抛出错误。
            //关于e:e 代表的是事件对象（Event），它包含有关用户交互的信息，比如点击的位置、触发的目标元素等
            //当一个点击事件发生时，浏览器会自动生成一个事件对象并传递给事件处理函数
        //     事件处理函数通常会接收 e，这是 Web 开发中的一个通用约定。即使在一些情况下 onClick 不一定需要 e，传递 e 确保了即使未来父组件需要使用事件对象，程序也能正常工作
        }
      }}
      className={clsx(
        ...(styleAs !== 'button'
          ? [
            'link h-4 active:text-medium',
            'disabled:!bg-transparent',
          ]
          : ['h-9']
        ),
        styleAs === 'link' && 'hover:text-dim',
        styleAs === 'link-without-hover' && 'hover:text-main',
        'inline-flex items-center gap-2 self-start whitespace-nowrap',
        primary && 'primary',
        className,
      )}
      disabled={isLoading || disabled}
    >
      {(icon || isLoading) &&
        <span className={clsx(
          'min-w-[1.25rem] max-h-5 overflow-hidden',
          styleAs === 'button' ? 'translate-y-[-0.5px]' : 'translate-y-[0.5px]',
          'inline-flex justify-center shrink-0',
        )}>
          {isLoading
            ? <Spinner
              size={14}
              color={spinnerColor}
              className="translate-y-[0.5px]"
            />
            : icon}
        </span>}
      {children && <span className={clsx(
        styleAs !== 'button' && isLoading && 'text-dim',
        hideTextOnMobile && icon !== undefined && 'hidden sm:inline-block',
      )}>
        {children}
      </span>}
    </button>
  );
}
