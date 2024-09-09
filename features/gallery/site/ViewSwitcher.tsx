import Switcher from '@/features/gallery/components/Switcher';
import SwitcherItem from '@/features/gallery/components/SwitcherItem';
import IconFeed from '@/features/gallery/site/IconFeed';
import IconGrid from '@/features/gallery/site/IconGrid';
import {
  PATH_ADMIN_PHOTOS,
  PATH_FEED_INFERRED,
  PATH_GRID_INFERRED,
} from '@/features/gallery/site/paths';
import { BiLockAlt } from 'react-icons/bi';
import IconSearch from './IconSearch';
import { useAppState } from '@/features/gallery/state/AppState';
import { GRID_HOMEPAGE_ENABLED } from './config';

export type SwitcherSelection = 'feed' | 'grid' | 'admin';

export default function ViewSwitcher({
  currentSelection,
  showAdmin,
}: {
  currentSelection?: SwitcherSelection
  showAdmin?: boolean
}) {
  const { setIsCommandKOpen } = useAppState();

  const renderItemFeed = () =>
    <SwitcherItem
      icon={<IconFeed />}
      href={PATH_FEED_INFERRED}
      active={currentSelection === 'feed'}
      noPadding
    />;

  const renderItemGrid = () =>
    <SwitcherItem
      icon={<IconGrid />}
      href={PATH_GRID_INFERRED}
      active={currentSelection === 'grid'}
      noPadding
    />;

  return (
    <div className="flex gap-1 sm:gap-2">
      <Switcher>
        {GRID_HOMEPAGE_ENABLED ? renderItemGrid() : renderItemFeed()}
        {GRID_HOMEPAGE_ENABLED ? renderItemFeed() : renderItemGrid()}
        {showAdmin &&
          <SwitcherItem
            icon={<BiLockAlt size={16} className="translate-y-[-0.5px]" />}
            href={PATH_ADMIN_PHOTOS}
            active={currentSelection === 'admin'}
          />}
      </Switcher>
      <Switcher type="borderless">
        <SwitcherItem
          icon={<IconSearch />}
          onClick={() => setIsCommandKOpen?.(true)}
        />
      </Switcher>
    </div>
  );
}
