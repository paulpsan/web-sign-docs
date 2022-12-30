export const getEnvVariables = () => {
    return{
        VITE_SVC_SIGNATURE_API: import.meta.env.VITE_SVC_SIGNATURE_API,
        VITE_KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
        VITE_KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
        VITE_KEYCLOAK_CLIENTID: import.meta.env.VITE_KEYCLOAK_CLIENTID,
        VITE_KEYCLOAK_SECRET: import.meta.env.VITE_KEYCLOAK_SECRET,
        VITE_USER_ACCESS_ROLE: import.meta.env.VITE_USER_ACCESS_ROLE
    }
}