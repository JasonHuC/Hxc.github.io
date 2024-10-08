import { TAG_HIDDEN } from './index';
import { pathForTag } from '@/features/gallery/site/paths';
import EntityLink, {
  EntityLinkExternalProps,
} from '@/features/gallery/components/primitives/EntityLink';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

export default function HiddenTag({
  type,
  badged,
  contrast,
  prefetch,
  countOnHover,
}: {
  countOnHover?: number
} & EntityLinkExternalProps) {
  return (
    <EntityLink
      label={badged
        ? <span className="inline-flex gap-1">
          {TAG_HIDDEN}
          <AiOutlineEyeInvisible
            size={13}
            className="translate-y-[-1.5px]"
          />
        </span>
        : TAG_HIDDEN}
      href={pathForTag(TAG_HIDDEN)}
      icon={!badged && <AiOutlineEyeInvisible size={16} />}
      type={type}
      hoverEntity={countOnHover}
      badged={badged}
      contrast={contrast}
      prefetch={prefetch}
    />
  );
}
