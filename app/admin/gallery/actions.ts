'use server';

import { runAuthenticatedAdminServerAction } from '@/features/gallery/auth';
import { testKvConnection } from '@/features/gallery/services/kv';
import { testOpenAiConnection } from '@/features/gallery/services/openai';
import { testDatabaseConnection } from '@/features/gallery/services/postgres';
import { testStorageConnection } from '@/features/gallery/services/storage';
import { CONFIG_CHECKLIST_STATUS } from '@/features/gallery/site/config';

const scanForError = (
  shouldCheck: boolean,
  promise: () => Promise<any>
): Promise<string> =>
  shouldCheck
    ? promise()
      .then(() => '')
      .catch(error => error.message)
    : Promise.resolve('');

export const testConnectionsAction = async () =>
  runAuthenticatedAdminServerAction(async () => {
    const {
      hasDatabase,
      hasStorageProvider,
      hasVercelKv,
      isAiTextGenerationEnabled,
    } = CONFIG_CHECKLIST_STATUS;

    const [
      databaseError,
      storageError,
      kvError,
      aiError,
    ] = await Promise.all([
      scanForError(hasDatabase, testDatabaseConnection),
      scanForError(hasStorageProvider, testStorageConnection),
      scanForError(hasVercelKv, testKvConnection),
      scanForError(isAiTextGenerationEnabled, testOpenAiConnection),
    ]);

    return {
      databaseError,
      storageError,
      kvError,
      aiError,
    };
  });
