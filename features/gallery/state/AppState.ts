import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { AnimationConfig } from '../components/AnimateItems';

export interface AppStateContext {
  // CORE
  previousPathname?: string
  hasLoaded?: boolean
  setHasLoaded?: Dispatch<SetStateAction<boolean>>
  swrTimestamp?: number
  invalidateSwr?: () => void
  nextPhotoAnimation?: AnimationConfig
  setNextPhotoAnimation?: Dispatch<SetStateAction<AnimationConfig | undefined>>
  clearNextPhotoAnimation?: () => void
  shouldRespondToKeyboardCommands?: boolean
  setShouldRespondToKeyboardCommands?: Dispatch<SetStateAction<boolean>>
  isCommandKOpen?: boolean
  setIsCommandKOpen?: Dispatch<SetStateAction<boolean>>
  //  ADMIN
  userEmail?: string
  setUserEmail?: Dispatch<SetStateAction<string | undefined>>
  isUserSignedIn?: boolean
  adminUpdateTimes?: Date[]
  registerAdminUpdate?: () => void
  hiddenPhotosCount?: number
  selectedPhotoIds?: string[]
  setSelectedPhotoIds?: Dispatch<SetStateAction<string[] | undefined>>
  isPerformingSelectEdit?: boolean
  setIsPerformingSelectEdit?: Dispatch<SetStateAction<boolean>>
  // DEBUG
  arePhotosMatted?: boolean
  setArePhotosMatted?: Dispatch<SetStateAction<boolean>>
  shouldDebugImageFallbacks?: boolean
  setShouldDebugImageFallbacks?: Dispatch<SetStateAction<boolean>>
  shouldShowBaselineGrid?: boolean
  setShouldShowBaselineGrid?: Dispatch<SetStateAction<boolean>>
}

export const AppStateContext = createContext<AppStateContext>({});//创建context对象

export const useAppState = () => useContext(AppStateContext);//使用上下文context的方式二：只需要将Context对象作为参数传递给钩子函数，它就会直接给我们返回Context对象中存储的数据。
//李李超链接：https://lilichao.com/?p=5653
