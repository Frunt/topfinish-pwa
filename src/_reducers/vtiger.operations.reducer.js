import {vtigerOperationsConstants} from "../_constants";


const initialState = {};

export function vtigerOperationsReducer(state = initialState, action) {
  switch (action.type) {
    case vtigerOperationsConstants.PROJECT_LIST:
      return Object.assign({}, state, {list: action.result});
    case vtigerOperationsConstants.GET_COMMENTS:
      return Object.assign({}, state, {comments: action.result});
    // case vtigerOperationsConstants.GET_REPLIES:
    // state.replies[action.name] = action.result;
    // // return state;
    // return JSON.parse(JSON.stringify(state));
    case vtigerOperationsConstants.GET_IMAGES:
      return Object.assign({}, state, {images: action.result});
    case vtigerOperationsConstants.GET_ROLE:
      return Object.assign({}, state, {role: action.result});
    case vtigerOperationsConstants.PROJECT_DETAILS:
      return Object.assign({}, state, {project: action.result});
    // case vtigerOperationsConstants.PROJECT_DESCR:
    //   return Object.assign({}, state, {descr: action.result});
    case vtigerOperationsConstants.WORKORDER_LIST:
      return Object.assign({}, state, {workorder: action.result});
    case vtigerOperationsConstants.WORKORDER_DETAILS:
      return Object.assign({}, state, {workorderDetails: action.result});
    case vtigerOperationsConstants.CREATE:
      return Object.assign({}, state, {create: action.result});
    case vtigerOperationsConstants.QUERY:
      return Object.assign({}, state, {query: action.result});
    default:
      return state
  }
}
