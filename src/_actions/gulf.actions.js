import {fail, success} from "../_helpers/respons.handeler";
import {gulfServices} from "../_services";
import {gulfConstants} from "../_constants";

export const gulfActions = {
    gulfGetToken,
    gulfRequest,
    gulfWeelprice
};

function gulfGetToken() {
    return dispatch => {
        gulfServices.gulfGetToken().then(
            res => dispatch(success(res, gulfConstants.GET_TOKEN)),
            error => dispatch(fail(error))
        )
    }
}

function gulfRequest(method, data, name) {
    return dispatch => {
        gulfServices.gulfRequest(method, data).then(
            res => {
                return dispatch(success(res, gulfConstants.GULF_REQUEST, name || method))
            },
            error => {
                return [];
                // dispatch(fail(error))
            }
        )
    }
}
function gulfWeelprice(method, data, name) {
    return dispatch => {
        // console.log('went for prices~!!!!!');
        gulfServices.gulfRequest(method, data).then(
            res => {

                return dispatch(success(res, gulfConstants.GET_WEEK_PRICE, name || method))
            },
            error => {
                return [];
                // dispatch(fail(error))
            }
        )
    }
}
