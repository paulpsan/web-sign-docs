import { message } from "antd";
import Keycloak from "keycloak-js";
import keycloakConf from '../../keycloak.json';
const _kc = new (Keycloak as any)(keycloakConf);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
/**
 * "initKeycloak" is a function that takes a callback as a parameter and returns a promise.
 * @param {any} onAuthenticatedCallback - This is a callback function that will be called after the
 * user is authenticated.
 */
const initKeycloak = (onAuthenticatedCallback: any) => {
  _kc.init({
    //onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    onLoad: "login-required",
    promiseType: "native"
  })
    .then((authenticated: any) => {
      if (!authenticated) {
        message.success("user is not authenticated..!");
      }
      localStorage.setItem("authenticated", JSON.stringify(authenticated));
      localStorage.setItem("keycloak", JSON.stringify(_kc));
      onAuthenticatedCallback();
    })
    .catch((error:any) => message.error(error));
};

/* A shorthand for `const doLogin = () => _kc.login();` */
const doLogin = _kc.login;

/* A shorthand for `const doLogout = () => _kc.logout();` */
const doLogout = _kc.logout;

/**
 * It returns the token from the keycloak object.
 */
const getToken = () => _kc.token;

/**
 * If the token is truthy, return true, otherwise return false.
 */
const isLoggedIn = () => !!_kc.token;

/**
 * If the token is updated successfully, call the successCallback function, otherwise call the doLogin
 * function.
 * @param {any} successCallback - This is the function that will be called if the token is successfully
 * updated.
 */
const updateToken = (successCallback: any) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

/**
 * If the tokenParsed property of the _kc object exists, return the preferred_username property of the
 * tokenParsed property of the _kc object
 */
const getUsername = () => _kc.tokenParsed?.preferred_username;

/**
 * If the user has any of the roles in the array, return true
 * @param {any} roles - any - this is the array of roles that the user has
 */
const hasRole = (roles: any) => roles.some((role: any) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
