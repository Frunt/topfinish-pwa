import {fail, success} from "../_helpers/respons.handeler";
import {vtigerOperationsServices} from "../_services";
import {vtigerOperationsConstants} from "../_constants";
import {history} from "../_helpers";

export const vtigerOperationsActions = {
    projectList,
    projectDetails,
    createOperation,
    workorderList,
    workorderDetails,
    queryOperation,
    addComment,
    getComments,
    getImages,
    updateStatus,
    saveDelivery,
    saveWorkorderImage,
    getRole
    // projectDescr,
    // getReplies
};

function projectList(isToday) {
    return isToday ? dispatch => {
        vtigerOperationsServices.projectList(true).then(
            res => dispatch(success(res, vtigerOperationsConstants.PROJECT_LIST)),
            error => dispatch(fail(error))
        )
    } : dispatch => {
        vtigerOperationsServices.projectList().then(
          res => dispatch(success(res, vtigerOperationsConstants.PROJECT_LIST)),
          error => dispatch(fail(error))
        )
    }
}

function getImages(id) {
    return dispatch => {
        vtigerOperationsServices.getImages(id).then(
          res => dispatch(success(res, vtigerOperationsConstants.GET_IMAGES)),
          error => dispatch(fail(error))
        )
    }
}
function getRole(id) {
  return dispatch => {
    vtigerOperationsServices.getRole(id).then(
      res => dispatch(success(res, vtigerOperationsConstants.GET_ROLE)),
      error => dispatch(fail(error))
    )
  }
}

function saveDelivery(customer_name, user_id, customer_signature, gps_location_latitude, gps_location_longitude, project_id) {
    return dispatch => {
        vtigerOperationsServices.saveDelivery(customer_name, user_id, customer_signature, gps_location_latitude, gps_location_longitude, project_id).then(
          res => dispatch(success(res, vtigerOperationsConstants.SAVE_DELIVERY)),
          error => dispatch(fail(error))
        )
    }
}
function saveWorkorderImage(workorder_image, project_task_id) {
    return dispatch => {
        vtigerOperationsServices.saveWorkorderImage(workorder_image, project_task_id).then(
          res => {
              dispatch(success(res, vtigerOperationsConstants.SAVE_WORKORDER_IMAGE));
              vtigerOperationsServices.getImages(project_task_id).then(
                res => dispatch(success(res, vtigerOperationsConstants.GET_IMAGES)),
                error => dispatch(fail(error))
              );
          },
          error => dispatch(fail(error))
        );

    }
}

function projectDetails(id) {
    return dispatch => {
        vtigerOperationsServices.projectDetails(id).then(
          res => dispatch(success(res, vtigerOperationsConstants.PROJECT_DETAILS)),
          error => dispatch(fail(error))
        )
    }
}
// function projectDescr(id) {
//     return dispatch => {
//         vtigerOperationsServices.projectDescr(id).then(
//           res => dispatch(success(res, vtigerOperationsConstants.PROJECT_DESCR)),
//           error => dispatch(fail(error))
//         )
//     }
// }


function workorderDetails(id) {
  return dispatch => {
    vtigerOperationsServices.workorderDetails(id).then(
      res => dispatch(success(res, vtigerOperationsConstants.WORKORDER_DETAILS)),
      error => dispatch(fail(error))
    )
  }
}



function workorderList(id) {
    return dispatch => {
        vtigerOperationsServices.workorderList(id).then(
          res => dispatch(success(res, vtigerOperationsConstants.WORKORDER_LIST)),
          error => dispatch(fail(error))
        )
    }
}

// function getReplies(id) {
//   return dispatch => {
//     vtigerOperationsServices.getReplies(id).then(
//       res => dispatch(success(res, vtigerOperationsConstants.GET_REPLIES, id)),
//       error => dispatch(fail(error))
//     )
//   }
// }

function getComments(id, place) {
    // about place
    // 0 - project
    // 1 - workorder
    return dispatch => {
        vtigerOperationsServices.getComments(id, place).then(
          res => dispatch(success(res, vtigerOperationsConstants.GET_COMMENTS)),
          error => dispatch(fail(error))
        )
    }
}
function updateStatus(project_task_id, status, project_id) {
    return dispatch => {
        vtigerOperationsServices.updateStatus(project_task_id, status).then(
          res => history.goBack()
        )
    }
}
function addComment(project_id, project_task_id, comments, parent_comment_id) {
    return dispatch => {
        vtigerOperationsServices.addComment(project_id, project_task_id, comments, parent_comment_id).then(
          res => {
              success(res, vtigerOperationsConstants.ADD_COMMENT);
              dispatch(getComments(project_task_id ? project_task_id : project_id, !!project_task_id));
          },
            error => dispatch(fail(error))
        )
    }
}

function createOperation(data, type) {
    return dispatch => {
        vtigerOperationsServices.createOperation(data, type).then(
            res => dispatch(success(res, vtigerOperationsConstants.CREATE, type))
        )
    }
}

function queryOperation(query) {
    return dispatch => {
        vtigerOperationsServices.queryOperation(query).then(
            res => dispatch(success(res, vtigerOperationsConstants.QUERY, query))
        )
    }
}
