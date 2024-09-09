'use client';//该组件运行在客户端
//本组件通过 React Context 提供一个全局的应用状态供子组件使用
import { useState, useEffect, ReactNode, useCallback } from 'react';
//usecallback用于缓存函数的引用，避免不必要的重新创建函数。
import { AppStateContext } from './AppState';
import { AnimationConfig } from '../components/AnimateItems';
import usePathnames from '../hooks/usePathnames';
import { getAuthAction } from '../auth/actions';
import useSWR from 'swr';
import { MATTE_PHOTOS } from '../site/config';
// import { getPhotosHiddenMetaCachedAction } from '../photo/actions';

export default function AppStateProvider({
  children,
}: {
  children: ReactNode
}) {
  const { previousPathname } = usePathnames();//获取之前访问的路径

  // CORE
  const [hasLoaded, setHasLoaded] =
    useState(false);
  const [swrTimestamp, setSwrTimestamp] =
    useState(Date.now());
  const [nextPhotoAnimation, setNextPhotoAnimation] =
    useState<AnimationConfig>();
  const [shouldRespondToKeyboardCommands, setShouldRespondToKeyboardCommands] =
    useState(true);
  const [isCommandKOpen, setIsCommandKOpen] =
    useState(false);
  // ADMIN
  const [userEmail, setUserEmail] =
    useState<string>();
  const [adminUpdateTimes, setAdminUpdateTimes] =
    useState<Date[]>([]);
  const [hiddenPhotosCount, setHiddenPhotosCount] =
    useState(0);
  const [selectedPhotoIds, setSelectedPhotoIds] =
    useState<string[] | undefined>();
  const [isPerformingSelectEdit, setIsPerformingSelectEdit] =
    useState(false);
  // DEBUG
  const [arePhotosMatted, setArePhotosMatted] =
    useState(MATTE_PHOTOS);
  const [shouldDebugImageFallbacks, setShouldDebugImageFallbacks] =
    useState(false);
  const [shouldShowBaselineGrid, setShouldShowBaselineGrid] =
    useState(false);

  const invalidateSwr = useCallback(() => setSwrTimestamp(Date.now()), []);

  const { data } = useSWR('getAuth', getAuthAction);
  useEffect(() => {
    setUserEmail(data?.user?.email ?? undefined);
  }, [data]);
  const isUserSignedIn = Boolean(userEmail);
  // useEffect(() => {
  //   if (isUserSignedIn) {
  //     const timeout = setTimeout(() =>
  //       getPhotosHiddenMetaCachedAction().then(({ count }) =>
  //         setHiddenPhotosCount(count))
  //     , 100);
  //     return () => clearTimeout(timeout);
  //   } else {
  //     setHiddenPhotosCount(0);
  //   }
  // }, [isUserSignedIn]);

  const registerAdminUpdate = useCallback(() =>
    setAdminUpdateTimes(updates => [...updates, new Date()])
  , []);

  useEffect(() => {
    setHasLoaded?.(true);
  }, []);

  return (//Provider会设置在外层组件（本文件的组件）中，通过value属性来指定Context的值。这个Context值在所有的Provider子组件中都可以访问。
      //第三种使用context的方法。李李超链接：https://lilichao.com/?p=5653
    <AppStateContext.Provider
      value={{
        // CORE
        previousPathname,
        hasLoaded,
        setHasLoaded,
        swrTimestamp,
        invalidateSwr,
        nextPhotoAnimation,
        setNextPhotoAnimation,
        clearNextPhotoAnimation: () => setNextPhotoAnimation?.(undefined),
        shouldRespondToKeyboardCommands,
        setShouldRespondToKeyboardCommands,
        isCommandKOpen,
        setIsCommandKOpen,
        // ADMIN
        userEmail,
        setUserEmail,
        isUserSignedIn,
        adminUpdateTimes,
        registerAdminUpdate,
        hiddenPhotosCount,
        selectedPhotoIds,
        setSelectedPhotoIds,
        isPerformingSelectEdit,
        setIsPerformingSelectEdit,
        // DEBUG
        arePhotosMatted,
        setArePhotosMatted,
        shouldDebugImageFallbacks,
        setShouldDebugImageFallbacks,
        shouldShowBaselineGrid,
        setShouldShowBaselineGrid,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
