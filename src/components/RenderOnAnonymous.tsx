import UserService from '../services/UserService';

/**
 * Si el usuario no ha iniciado sesión, renderice el CHILDREN, de lo contrario, no renderice nada.
 * @param {any}  - any - este es el tipo del parámetro. En este caso, es un objeto.
 */
export const RenderOnAnonymous = ( {children}:any ) => ( !UserService.isLoggedIn()) ? children : null; 
