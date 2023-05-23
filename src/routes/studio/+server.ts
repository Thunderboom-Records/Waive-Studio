import type { RequestHandler } from '../../../.svelte-kit/types/src/routes';

export const GET: RequestHandler = async () => {
    return new Response();
};