import {globals} from "../_helpers";
import {handleResponse} from "../_helpers/respons.handeler";

export const gulfServices = {
    gulfGetToken,
    refreshToken,
    gulfRequest
};

function gulfGetToken() {
    const jsonBody = {
        'grant_type': 'password',
        'username': 'qeis@it-journey.nl',
        'password': 'as24EBI42@BDSr#3ld133xcaDWRi23!@',
        'client_id': '1_54c9loxtko008cw0cg0go4w4s4wk0g0g08k8c8csw4s48g4ggo',
        'client_secret': '1tbmypzs5udc088gcowo4ocg4g4c0g8s0c04kokk8w840goc0s'
    };

    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    const req = {
        method: 'post',
        body: formData
    };

    return fetch(globals.gulfUrl + 'oauth/v2/token', req).then(handleResponse).then(res => localStorage.setItem('gulf', JSON.stringify(res)))
}

function refreshToken() {
    const jsonBody = {
        'grant_type': 'refresh_token',
        'refresh_token': JSON.parse(localStorage.getItem('gulf')).refresh_token,
        'client_id': '1_54c9loxtko008cw0cg0go4w4s4wk0g0g08k8c8csw4s48g4ggo',
        'client_secret': '1tbmypzs5udc088gcowo4ocg4g4c0g8s0c04kokk8w840goc0s'
    };

    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    console.info('%cRefresh gulf token', 'color: green');
    const req = {
        method: 'post',
        body: formData
    };

    return fetch(globals.gulfUrl + 'oauth/v2/token', req).then(handleResponse).then(res => localStorage.setItem('gulf', JSON.stringify(res)))
}

function gulfRequest(method, data) {
    let options = '&';

    for (let k in data) {
        if (data.hasOwnProperty(k) && data[k]) {
            options = options + k + '=' + data[k] + '&'
        }
    }
    options = options.substring(0, options.length -1);
    const req = {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('gulf')).access_token
        },
        method: 'GET',
    };

    return fetch('https://app.unifa.nl/proxy/index.php?method='  + method + options, req).then(handleResponse)
}
