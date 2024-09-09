import { labelForFilmSimulation } from '@/features/gallery/vendors/fujifilm';
import PhotoFilmSimulationIcon from './PhotoFilmSimulationIcon';
import { pathForFilmSimulation } from '@/features/gallery/site/paths';
import { FilmSimulation } from '.';
import EntityLink, {
  EntityLinkExternalProps,
} from '@/features/gallery/components/primitives/EntityLink';

export default function PhotoFilmSimulation({
  simulation,
  type = 'icon-last',
  badged = true,
  contrast = 'low',
  prefetch,
  countOnHover,
}: {
  simulation: FilmSimulation
  countOnHover?: number
} & EntityLinkExternalProps) {
  const { small, medium, large } = labelForFilmSimulation(simulation);

  return (
    <EntityLink
      label={medium}
      labelSmall={small}
      href={pathForFilmSimulation(simulation)}
      icon={<PhotoFilmSimulationIcon simulation={simulation} />}
      title={`Film Simulation: ${large}`}
      type={type}
      badged={badged}
      contrast={contrast}
      prefetch={prefetch}
      hoverEntity={countOnHover}
      iconWide
    />
  );
}
