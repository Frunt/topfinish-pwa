import {globals} from "../_helpers";
import {handleResponse} from "../_helpers/respons.handeler";

export const kvkServices = {
    kvkSearch,
    kvkProfile
};

function kvkSearch(query) {
    const req = {
        method: 'get'
    };
    return fetch(globals.kvkUrl + 'search/companies' + query + '&apiKey=l7xxe5dc947e67634849819b870df3a9a7b4', req)
        .then(handleResponse)
}

function kvkProfile(query) {
    const req = {
        method: 'get'
    };
    return fetch(globals.kvkUrl + 'testprofile/companies' + query + '&apiKey=l7xxe5dc947e67634849819b870df3a9a7b4', req)
        .then(handleResponse)
}