import { PATH_ADMIN } from '@/features/gallery/site/paths';
import { extractImageDataFromBlobPath } from '@/features/gallery/photo/server';
import { redirect } from 'next/navigation';
import { getUniqueTagsCached } from '@/features/gallery/photo/cache';
import UploadPageClient from '@/features/gallery/photo/UploadPageClient';
import {
    AI_TEXT_AUTO_GENERATED_FIELDS,
    AI_TEXT_GENERATION_ENABLED,
    BLUR_ENABLED,
} from '@/features/gallery/site/config';

export const maxDuration = 60;

interface Params {
    params: { uploadPath: string }
}

export default async function UploadPage({ params: { uploadPath } }: Params) {
    const {
        blobId,
        photoFormExif,
        imageResizedBase64: imageThumbnailBase64,
        shouldStripGpsData,
    } = await extractImageDataFromBlobPath(uploadPath, {
        includeInitialPhotoFields: true,
        generateBlurData: BLUR_ENABLED,
        generateResizedImage: AI_TEXT_GENERATION_ENABLED,
    });

    if (
        !photoFormExif ||
        (AI_TEXT_GENERATION_ENABLED && !imageThumbnailBase64)
    ) {
        redirect(PATH_ADMIN);
    }

    const uniqueTags = await getUniqueTagsCached();

    const hasAiTextGeneration = AI_TEXT_GENERATION_ENABLED;

    const textFieldsToAutoGenerate = AI_TEXT_AUTO_GENERATED_FIELDS;

    return (
        <UploadPageClient {...{
            blobId,
            photoFormExif,
            uniqueTags,
            hasAiTextGeneration,
            textFieldsToAutoGenerate,
            imageThumbnailBase64,
            shouldStripGpsData,
        }} />
    );
};
