const {
    VITE_HOME_INTE_HOST: homeInteHost,
} = import.meta.env;

import {
    SARA_QUERY_KEY_REFER,
    SARA_STORAGE_KEY_REFER_URL,
    SARA_STORAGE_KEY_LOGIN_HISTORY,
} from "./const.js";

function getLoginEmailHistory() {
    const email = localStorage.getItem(SARA_STORAGE_KEY_LOGIN_HISTORY);
    return email || "";
}

function setLoginEmailHistory(value) {
    localStorage.setItem(SARA_STORAGE_KEY_LOGIN_HISTORY, value);
}

function clearLoginEmailHistory() {
    localStorage.removeItem(SARA_STORAGE_KEY_LOGIN_HISTORY);
}

function getReferUrl() {
    const url = sessionStorage.getItem(SARA_STORAGE_KEY_REFER_URL);
    return url || homeInteHost;
}

function setReferUrl(url) {
    sessionStorage.setItem(SARA_STORAGE_KEY_REFER_URL, url);
}

function clearReferUrl() {
    sessionStorage.removeItem(SARA_STORAGE_KEY_REFER_URL);
}

function readUrlRefer() {
    if (!window.location.search) {
        return null;
    }

    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.has(SARA_QUERY_KEY_REFER)) {
        return null;
    }

    return queryParams.get(SARA_QUERY_KEY_REFER);
}

function isUrlSafe(url) {
    const targetUrl = new URL(url);
    const safeUrl = new URL(homeInteHost);
    return targetUrl.host === safeUrl.host;
}

function safeUrlAssignSpecific(url) {
    if (!isUrlSafe(url)) {
        console.warn("Unsafe url detected: " + url);
        url = homeInteHost;
    }
    window.location.assign(url);
}

function safeUrlAssignRefer() {
    const url = getReferUrl();
    clearReferUrl();

    setTimeout(() => {
        safeUrlAssignSpecific(url);
    }, 500);
}

export {
    getLoginEmailHistory,
    setLoginEmailHistory,
    clearLoginEmailHistory,
    getReferUrl,
    setReferUrl,
    clearReferUrl,
    readUrlRefer,
    safeUrlAssignSpecific,
    safeUrlAssignRefer,
};
