import keycloakConf from '../../keycloak.json'
import { getEnvVariables } from './getEnvVariables';
export const getKeycloakVariables = () => {
    const {
        VITE_KEYCLOAK_CLIENTID,
        VITE_KEYCLOAK_REALM,
        VITE_KEYCLOAK_URL,
        VITE_KEYCLOAK_SECRET
    } = getEnvVariables();
    const data =
    {
        ...keycloakConf,
        clientId: VITE_KEYCLOAK_CLIENTID,
        realm: VITE_KEYCLOAK_REALM, 
        url: VITE_KEYCLOAK_URL,
        credentials:{ secret: VITE_KEYCLOAK_SECRET }
    }
    return data;
}