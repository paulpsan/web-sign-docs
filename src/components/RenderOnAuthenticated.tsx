import UserService from '../services/UserService';

/**
 * Si el usuario ha iniciado sesión, renderice los elementos secundarios; de lo contrario, no renderice nada.
 * @param {any}  - any; Este es el tipo de accesorios que se pasan al componente.
 */
export const RenderOnAuthenticated = ({ children }:any) => ( UserService.isLoggedIn()) ? children : null; 
