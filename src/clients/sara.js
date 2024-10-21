import ky from "ky"

const {
    VITE_SARA_RECV_HOST: baseUrl,
    VITE_SARA_TOKEN_NAME: saraTokenName,
    VITE_SARA_GUARD_NAME: saraGuardName,
} = import.meta.env;

const useSaraToken = (request) => {
    const saraToken = localStorage.getItem(saraTokenName);
    const guardToken = localStorage.getItem(saraGuardName);
    if (!saraToken || !guardToken) return;

    const tokenValue = [saraToken, guardToken].join("|");
    request.headers.set("authorization", `XARA ${tokenValue}`);
};

const refreshSaraToken = (_request, _options, response) => {
    const tokenValue = response.headers.get("x-sara-refresh");
    if (!tokenValue) return;

    const [saraToken, guardToken] = tokenValue.split("|", 2);
    localStorage.setItem(saraTokenName, saraToken);
    localStorage.setItem(saraGuardName, guardToken);
};

const revokeSaraToken = (_request, _options, response) => {
    const tokenStatus = response.status;
    if (tokenStatus !== 401) return;

    localStorage.removeItem(saraTokenName);
    localStorage.removeItem(saraGuardName);
};

const client = ky.create({
    prefixUrl: baseUrl,
    hooks: {
        beforeRequest: [
            useSaraToken,
        ],
        afterResponse: [
            refreshSaraToken,
            revokeSaraToken,
        ],
    }
});

export const useClient = () => client;
