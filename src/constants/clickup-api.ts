export const CLICKUP_API = {
    TEAMS: '/team',
    FOLDERS: '/folder',
    SPACE: '/space',
    LISTS: '/list',
    TASKS: '/task',
    TAGS: '/tag',
}

export const BASE_CLICKUP_API_URL = 'https://api.clickup.com/api/v2';

export function getClickupApiUrl(path: string) {
    return `${BASE_CLICKUP_API_URL}${path}`;
}
