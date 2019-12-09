import {fail, success} from "../_helpers/respons.handeler";
import {kvkServices} from "../_services";
import {kvkConstants} from "../_constants";

export const kvkActions = {
    kvkSearch
};

function kvkSearch(query, name) {
    return dispatch => {
        kvkServices.kvkSearch(query).then(
            res => dispatch(success(res, kvkConstants.SEARCH, name)),
            error => dispatch(fail(error))
        )
    }
}
