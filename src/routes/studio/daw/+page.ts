import type { PageLoad } from '../../../.svelte-kit/types/src/routes';

export const ssr = false;

export const load = (async () => {
    return {};
}) satisfies PageLoad;