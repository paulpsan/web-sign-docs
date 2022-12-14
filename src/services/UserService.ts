import Keycloak from "keycloak-js";
import keycloakConf from '../../keycloak.json';
const _kc = new (Keycloak as any)(keycloakConf);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
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
        console.log("user is not authenticated..!");
      }
      localStorage.setItem("authenticated", JSON.stringify(authenticated));
      localStorage.setItem("keycloak", JSON.stringify(_kc));
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

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
