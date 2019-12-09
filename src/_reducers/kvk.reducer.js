import {kvkConstants} from "../_constants";

export function kvkReducer(state = {}, action) {
    switch (action.type) {
        case kvkConstants.SEARCH:
            return Object.assign({}, state, {[action.name]: action.result});
        default:
            return state
    }
}