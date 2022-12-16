import UserService from '../services/UserService';

/**
 * If the user is logged in, then render the children, otherwise, render nothing.
 * @param {any}  - any -&gt; This is the type of the props that are passed to the component.
 */
export const RenderOnAuthenticated = ({ children }:any) => ( UserService.isLoggedIn()) ? children : null; 
