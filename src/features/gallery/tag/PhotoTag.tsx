import { pathForTag } from '@/features/gallery/site/paths';
import { FaTag } from 'react-icons/fa';
import { formatTag } from './index';
import EntityLink, {
  EntityLinkExternalProps,
} from '@/features/gallery/components/primitives/EntityLink';

export default function PhotoTag({
  tag,
  type,
  badged,
  contrast,
  prefetch,
  countOnHover,
}: {
  tag: string
  countOnHover?: number
} & EntityLinkExternalProps) {
  return (
    <EntityLink
      label={formatTag(tag)}
      href={pathForTag(tag)}
      icon={<FaTag
        size={11}
        className="translate-y-[1px]"
      />}
      type={type}
      badged={badged}
      contrast={contrast}
      prefetch={prefetch}
      hoverEntity={countOnHover}
    />
  );
}
