const {
  VITE_HOME_INTE_HOST: homeInteHost,
} = import.meta.env;

import {
  SARA_QUERY_KEY_REFER,
  SARA_STORAGE_KEY_REFER_URL,
  SARA_STORAGE_KEY_LOGIN_HISTORY,
} from "./const.js";

/**
 * Get login email history from local storage.
 * @returns {string} - The email history.
 */
function getLoginEmailHistory() {
  const email = localStorage.getItem(SARA_STORAGE_KEY_LOGIN_HISTORY);
  return email || "";
}

/**
 * Set login email history to local storage.
 * @param {string} value - The email history.
 * @returns {void}
 */
function setLoginEmailHistory(value) {
  localStorage.setItem(SARA_STORAGE_KEY_LOGIN_HISTORY, value);
}

/**
 * Clear login email history from local storage.
 * @returns {void}
 */
function clearLoginEmailHistory() {
  localStorage.removeItem(SARA_STORAGE_KEY_LOGIN_HISTORY);
}

/**
 * Get refer url from session storage.
 * @returns {string} - The refer url.
 */
function getReferUrl() {
  const url = sessionStorage.getItem(SARA_STORAGE_KEY_REFER_URL);
  return url || homeInteHost;
}

/**
 * Set refer url to session storage.
 * @param {string} url - The refer url.
 * @returns {void}
 */
function setReferUrl(url) {
  sessionStorage.setItem(SARA_STORAGE_KEY_REFER_URL, url);
}

/**
 * Clear refer url from session storage.
 * @returns {void}
 */
function clearReferUrl() {
  sessionStorage.removeItem(SARA_STORAGE_KEY_REFER_URL);
}

/**
 * Read refer url from url query.
 * @returns {string|null} - The refer url.
 */
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

/**
 * Check if the url is safe.
 * @param {string} url - The url to check.
 * @returns {boolean} - The result.
 */
function isUrlSafe(url) {
  const targetUrl = new URL(url);
  const safeUrl = new URL(homeInteHost);
  return targetUrl.host === safeUrl.host;
}

/**
 * Assign the url to the window location.
 * If the url is not safe, assign the home inte host.
 * @param {string} url - The url to assign.
 * @returns {void}
 */
function safeUrlAssignSpecific(url) {
  if (!isUrlSafe(url)) {
    console.warn("Unsafe url detected: " + url);
    url = homeInteHost;
  }
  window.location.assign(url);
}

/**
 * Assign the refer url to the window location.
 * If the refer url is not safe, assign the home inte host.
 * @returns {void}
 */
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
