import UserService from '../services/UserService';

/**
 * If the user is not logged in, render the children, otherwise, render nothing.
 * @param {any}  - any - this is the type of the parameter. In this case, it's an object.
 */
export const RenderOnAnonymous = ( {children}:any ) => ( !UserService.isLoggedIn()) ? children : null; 
