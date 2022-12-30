import { getEnvVariables } from '../helpers/getEnvVariables';
import UserService from '../services/UserService';
import { RestrictedAccess } from "./../UI/components/RestrictedAccess/RestrictedAccess"

/**
 * Si el usuario ha iniciado sesión, renderice los elementos secundarios; de lo contrario, no renderice nada.
 * @param {any}  - any; Este es el tipo de accesorios que se pasan al componente.
 */

export const RenderOnAuthenticated = ({ children }:any) =>{
    const { VITE_USER_ACCESS_ROLE } = getEnvVariables();
    const _kc = JSON.parse(localStorage.getItem('keycloak')!);
    const { realmAccess: { roles } } = _kc;
    return ( UserService.isLoggedIn()) ? 
            roles.includes(VITE_USER_ACCESS_ROLE) ? children : <RestrictedAccess/> : null 
} 
