export const homeRoot = '/';
export const loginRoot = '/login';
export const searchRoot = '/';
export const createProfileRoot = '/profile';
export const updateProfileRoot = '/profile/:userId';
export const getUpdateProfileRoot = (userId: string): string => `/profile/${userId}`;
