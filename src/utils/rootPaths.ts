export const homeRoot = '/';
export const loginRoot = '/login';
export const searchRoot = '/';
export const createProfileRoot = '/profile';
export const updateProfileRoot = '/profile/:userId';
/**
 * Returns the route for the profile page for a specific userdId
 *
 * @param userId - The id of the user to arcode to the profile route
 *
 * @returns `/profile/${userId}`
 *
 */
export const getUpdateProfileRoot = (userId: string): string => `/profile/${userId}`;
