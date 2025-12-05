/**
 * Created by Ryan Balieiro on 03.02.2025
 */
export function useSettings() {
    /**
     * @return {boolean}
     */
    const getLoaderEnabled = () => {
        return true
    }

    /**
     * @return {{publicKey: string, serviceId: string, templateId: string}}
     */
    const getCredentialsForEmailJS = () => {
        return {
            publicKey: "Cju2kq7FKtzDyx39X",
            serviceId: "service_55y8kjo",
            templateId: "template_h6ob5js"
        }
    }

    return {
        getLoaderEnabled,
        getCredentialsForEmailJS
    }
}