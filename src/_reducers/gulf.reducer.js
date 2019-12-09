import {gulfConstants} from "../_constants";

export function gulfReducer(state = {}, action) {
    switch (action.type) {
        case gulfConstants.GET_TOKEN:
            return Object.assign({}, state, {search: action.result});
        case gulfConstants.GET_WEEK_PRICE:
            return Object.assign({}, state, {weekprice: action.result});
        case gulfConstants.GULF_REQUEST:
            const gulf = Object.assign({}, state.gulf ? state.gulf : {}, {[action.name]: action.result});
            return Object.assign({}, state, {gulf});
        default:
            return state
    }
}
