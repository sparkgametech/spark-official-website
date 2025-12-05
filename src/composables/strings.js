/**
 * Created by Ryan Balieiro on 03.01.2025
 */
const MAP = {
    "about": "關於",
    "all_categories": "全部",
    "contact_thank_you": "*感謝* 您與我們聯繫！",
    "contact_thank_you_description": "您的訊息已收到，我們的團隊將很快與您聯繫。",
    "contact_thank_you_reply": "我們的回覆將發送到您的電子郵件地址 *{email}*。",
    "copyright_message": "版權所有 ©{year} <a href='{url}' target='_blank'>{holder}</a> – {license}",
    "email": "電子郵件",
    "error_fill_all_fields": "請填寫所有欄位。",
    "error_invalid_email": "請輸入有效的電子郵件地址。",
    "error_sending_message": "發送訊息時發生錯誤。",
    "latest_release": "最新版本",
    "loading": "載入中...",
    "message": "訊息",
    "name": "姓名",
    "project_available_here": "<strong>@{title}</strong> 可在以下平台或服務中使用：",
    "send": "發送訊息",
    "sending_message": "發送訊息中...",
    "subject": "主旨",
    "tags": "標籤：",
    "where_to_find": "在哪裡找到"
}

export function useStrings() {
    /**
     * @param {String} key
     * @param {{key:String, replacement:String}[]} [replacements=null]
     * @return {*|string}
     */
    const get = (key, replacements) => {
        let string = MAP[key] || 'strings.' + key

        if(replacements) {
            replacements.forEach(({key, replacement}) => {
                string = string.replaceAll('@{'+key+'}', replacement)
            })
        }

        return string
    }

    /**
     * @param {String|Number} year
     * @param {String} holder
     * @param {String} url
     * @return {string}
     */
    const getCopyrightMessage = (year, holder, url, license) => {
        return get("copyright_message").replaceAll("{year}", year.toString())
            .replaceAll("{url}", url)
            .replaceAll("{holder}", holder)
            .replaceAll("{license}", license)
    }

    return {
        get,
        getCopyrightMessage
    }
}