export const getEnvVariables = () => {
    //import.meta.env;
    return{
        ...import.meta.env.VITE_SVC_SIGNATURE_API
    }
}