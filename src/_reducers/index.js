import {usersReducer} from "./users.reducers";
import {combineReducers} from 'redux';
import {vtigerOperationsReducer} from "./vtiger.operations.reducer";
import {kvkReducer} from "./kvk.reducer";
import {gulfReducer} from "./gulf.reducer";
import {localReducer} from "./local.reducer";

const rootReducer = combineReducers({
    usersReducer,
    vtigerOperationsReducer,
    kvkReducer,
    gulfReducer,
    localReducer
});

export default rootReducer;