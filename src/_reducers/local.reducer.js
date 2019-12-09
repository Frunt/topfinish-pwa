import {localConstants} from "../_constants/loacl.constants";

export function localReducer(state = {}, action) {
    switch (action.type) {
        case localConstants.SELECT_ADDRESSES:
            return Object.assign({}, state, {selected: action.result});
        case localConstants.SELECTED_KVK:
            return Object.assign({}, state, {selected_kvk: action.result});
        case localConstants.STEP_3_SORT:
            return Object.assign({}, state, {step3: action.result});
        case localConstants.STEP_4_SORT:
            return Object.assign({}, state, {step4: action.result});
        case localConstants.STEP_3_REGISTER:
            return Object.assign({}, state, {step3_register: action.result});
        case localConstants.CONSUMPTION:
            return Object.assign({}, state, {consumption: action.result});
        case localConstants.CURRENT_STEP:
            return Object.assign({}, state, {step: action.result});
        case localConstants.FULL_DATA:
            return Object.assign({}, state, {fullData: action.result});
        case localConstants.LAST_STEP_WAY:
            return Object.assign({}, state, {confirmation: action.result});
        case localConstants.OFFERTE_DATA:
            return Object.assign({}, state, {offerte_data: action.result});
        case localConstants.CURRENT_SEARCH:
            return Object.assign({}, state, {current_search: action.result});
        default:
            return state
    }
}