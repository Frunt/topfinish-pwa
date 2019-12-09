import {success} from "../_helpers/respons.handeler";

export function LocalDispatch(data, action) {
    return dispatch => {
        dispatch(success(data, action))
    };
}