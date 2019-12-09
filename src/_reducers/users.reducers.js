import {usersConstants} from "../_constants";

export function usersReducer(state = {}, action) {
    switch (action.type) {
        case usersConstants.LOGIN:
            return  action.result;
        default:
            return state
    }
}
