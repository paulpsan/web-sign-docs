export const getEnvVariables = () => {
    //import.meta.env;
    return{
        VITE_SVC_SIGNATURE_API: import.meta.env.VITE_SVC_SIGNATURE_API
    }
}