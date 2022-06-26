import {
    SARA_REFER_KEY_NAME,
    SARA_REFER_URL_NAME,
} from "./const";

function saraReferTrigger(callback) {
    if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.has(SARA_REFER_URL_NAME)) {
            callback(params.get(SARA_REFER_URL_NAME));
        }
    }
}

function goToSafeLocation(url, replace = true) {
    if (!isSafeRedirectUrl(url)) {
        console.warn("Unsafe redirect url detected: " + url);
        url = process.env.VUE_APP_WEBSITE_URL;
        console.warn("Reject it");
    }
    if (replace) {
        window.location.replace(url);
    } else {
        window.location.assign(url);
    }
}

function isSafeRedirectUrl(url) {
    const targetUrl = new URL(url);
    const safeUrl = new URL(process.env.VUE_APP_WEBSITE_URL);
    return targetUrl.host === safeUrl.host;
}

function exitApplication() {
    const url = sessionStorage.getItem(SARA_REFER_KEY_NAME) || process.env.VUE_APP_WEBSITE_URL;
    setTimeout(() => goToSafeLocation(url), 500);
    sessionStorage.removeItem(SARA_REFER_KEY_NAME);
}

export { saraReferTrigger, goToSafeLocation, isSafeRedirectUrl, exitApplication };
