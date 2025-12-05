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
            serviceId: "service_4h8g7vb",
            templateId: "template_react"
        }
    }

    return {
        getLoaderEnabled,
        getCredentialsForEmailJS
    }
}