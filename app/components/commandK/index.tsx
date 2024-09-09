import CommandKClient, {
    CommandKSection,
} from '@/features/gallery/components/cmdk/CommandKClient';
import {
    getPhotosMetaCached,
    getUniqueCamerasCached,
    getUniqueFilmSimulationsCached,
    getUniqueTagsCached,
} from '@/features/gallery/photo/cache';
import {
    pathForCamera,
    pathForFilmSimulation,
    pathForFocalLength,
} from './paths';
import { formatCameraText } from '@/features/gallery/camera';
import { photoQuantityText } from '@/features/gallery/photo';
import { formatCount, formatCountDescriptive } from '@/features/gallery/utility/string';
import PhotoFilmSimulationIcon from '@/features/gallery/simulation/PhotoFilmSimulationIcon';
import { IoMdCamera } from 'react-icons/io';
import { ADMIN_DEBUG_TOOLS_ENABLED, SHOW_FILM_SIMULATIONS } from './config';
import { labelForFilmSimulation } from '@/features/gallery/simulation/fujifilm';
import { getUniqueFocalLengths } from '@/features/gallery/photo/db/query';
import { formatFocalLength } from '@/features/gallery/focal';
import { TbCone } from 'react-icons/tb';

export default async function CommandK() {
    const [
        count,
        tags,
        cameras,
        filmSimulations,
        focalLengths,
    ] = await Promise.all([
        getPhotosMetaCached()
            .then(({ count }) => count)
            .catch(() => 0),
        getUniqueTagsCached().catch(() => []),
        getUniqueCamerasCached().catch(() => []),
        SHOW_FILM_SIMULATIONS
            ? getUniqueFilmSimulationsCached().catch(() => [])
            : [],
        getUniqueFocalLengths().catch(() => []),
    ]);

    const SECTION_CAMERAS: CommandKSection = {
        heading: 'Cameras',
        accessory: <IoMdCamera />,
        items: cameras.map(({ camera, count }) => ({
            label: formatCameraText(camera),
            annotation: formatCount(count),
            annotationAria: formatCountDescriptive(count),
            path: pathForCamera(camera),
        })),
    };

    const SECTION_FILM: CommandKSection = {
        heading: 'Film Simulations',
        accessory: <span className="w-3">
      <PhotoFilmSimulationIcon className="translate-y-[0.5px]" />
    </span>,
        items: filmSimulations.map(({ simulation, count }) => ({
            label: labelForFilmSimulation(simulation).medium,
            annotation: formatCount(count),
            annotationAria: formatCountDescriptive(count),
            path: pathForFilmSimulation(simulation),
        })),
    };

    const SECTION_FOCAL: CommandKSection = {
        heading: 'Focal Lengths',
        accessory: <TbCone
            className="rotate-[270deg] text-[14px]"
        />,
        items: focalLengths.map(({ focal, count }) => ({
            label: formatFocalLength(focal)!,
            annotation: formatCount(count),
            annotationAria: formatCountDescriptive(count),
            path: pathForFocalLength(focal),
        })),
    };

    return <CommandKClient
        tags={tags}
        serverSections={[
            SECTION_CAMERAS,
            SECTION_FILM,
            SECTION_FOCAL,
        ]}
        showDebugTools={ADMIN_DEBUG_TOOLS_ENABLED}
        footer={photoQuantityText(count, false)}
    />;
}
