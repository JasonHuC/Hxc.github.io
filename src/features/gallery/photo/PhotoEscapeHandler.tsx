'use client';
//监听键盘事件（按下 Escape 键），并根据当前的路径重定向用户到某个预定义的“逃脱路径”（escapePath）。
import { getEscapePath } from '../site/paths';
import { useAppState } from '../state/AppState';//获取全局context数据
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LISTENER_KEYUP = 'keyup';

export default function PhotoEscapeHandler() {
  const router = useRouter();
 
  const pathname = usePathname();

  const { shouldRespondToKeyboardCommands } = useAppState();

  const escapePath = getEscapePath(pathname);

  useEffect(() => {
    // 用于添加键盘事件监听器，当组件加载时会添加 keyup 事件监听器，当组件卸载时会移除这个监听器。
    if (shouldRespondToKeyboardCommands) {//如果false则不会添加事件监听器
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key.toUpperCase() === 'ESCAPE' && escapePath) {
          router.push(escapePath, { scroll: false });//跳转时保持当前的滚动位置
        }
      };
      window.addEventListener(LISTENER_KEYUP, onKeyUp);
      return () => window.removeEventListener(LISTENER_KEYUP, onKeyUp);
    }
  }, [shouldRespondToKeyboardCommands, router, escapePath]);

  return null;
}
