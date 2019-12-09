import {gulfServices} from "../_services/gulf.services";

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // logout();
                gulfServices.refreshToken();
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function logout() {
    localStorage.removeItem('user');
}

export function fail(res) {
    console.error(res);
}

export function success(result, type, name) {
    return {type: type, result, name: name}
}
