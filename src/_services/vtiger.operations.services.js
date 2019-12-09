import {globals} from "../_helpers";
import {handleResponse} from "../_helpers/respons.handeler";

const sessionId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sessionId : '';
export const vtigerOperationsServices = {
    projectList,
    projectDetails,
    workorderList,
    workorderDetails,
    createOperation,
    queryOperation,
    addComment,
    getComments,
    getImages,
    updateStatus,
    projectDescr,
    saveDelivery,
    saveWorkorderImage,
    getRole
    // getReplies
};
// http://ontwikkel.topfinish.itjourney.nl/workorder_picture_details.php?project_task_id=33155
// https://ontwikkel.topfinish.itjourney.nl/33155&status=completed
// https://ontwikkel.topfinish.itjourney.nl/get_project_task_comments.php?project_task_id=33157
// https://ontwikkel.topfinish.itjourney.nl/get_reply_comments.php?parent_comments_id=33156
// https://ontwikkel.topfinish.itjourney.nl/project_description.php
// https://topfinish.itjourney.nl/710/save_delivery_info.php
function saveWorkorderImage(workorder_image, project_task_id) {
    const {userId} = JSON.parse(localStorage.getItem('user')).info;
    const jsonBody = {
        user_id: userId,
        workorder_image,
        project_task_id,
    };
    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(globals.vtigerUrl + 'save_workorder_image.php', requestOptions).then(handleResponse)
}
function saveDelivery(customer_name, user_id, customer_signature, gps_location_latitude, gps_location_longitude, project_id) {
    const jsonBody = {
        customer_name,
        user_id,
        customer_signature,
        gps_location_latitude,
        gps_location_longitude,
        project_id
    };
    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(globals.vtigerUrl + 'save_delivery_info.php', requestOptions).then(handleResponse)
}
function projectList(isToday) {
    const req = {
        method: 'get'
    };
    const {userId} = JSON.parse(localStorage.getItem('user')).info;
    return fetch(globals.vtigerUrl + 'projectlist.php?user_id=' + userId + (isToday ? '&isToday=true' : ''), req)
        .then(handleResponse)
}
function getComments(id, place) {
    const file = place ? 'get_project_task_comments.php?project_task_id=' : 'get_project_comments.php?project_id=';
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + file + id, req)
        .then(handleResponse)
}

// function getReplies(id) {
//   const file = 'get_reply_comments.php?parent_comments_id=';
//   const req = {
//     method: 'get'
//   };
//   return fetch(globals.vtigerUrl + file + id, req)
//     .then(handleResponse)
// }

function getImages(id) {
    const file = 'workorder_picture_details.php?project_task_id=';
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + file + id, req)
      .then(handleResponse)
}
function getRole(id) {
    const file = 'getRoleId.php?user_id=';
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + file + id, req)
      .then(handleResponse)
}

function projectDetails(id) {
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + 'projectdetail.php?id=' + id, req)
      .then(handleResponse)
}
function projectDescr(id) {
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + 'project_description.php?id=' + id, req)
      .then(handleResponse)
}
function workorderDetails(id) {
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + 'projecttaskdetail.php?id=' + id, req)
      .then(handleResponse)
}

function workorderList(id) {
    const req = {
        method: 'get'
    };
    const {userId} = JSON.parse(localStorage.getItem('user')).info;

    return fetch(globals.vtigerUrl + 'projecttasklist.php?id=' + id + '&user_id=' + userId, req)
      .then(handleResponse)
}

function addComment(project_id, project_task_id, comments, parent_comment_id) {
    const file = 'project_task_comments.php';
    const {userId} = JSON.parse(localStorage.getItem('user')).info;
    const jsonBody = parent_comment_id ? project_task_id ? {project_task_id,parent_comment_id,comments, user_id: userId} : {project_id, parent_comment_id, comments, user_id: userId} : project_task_id ? {project_task_id, comments, user_id: userId} : {project_id, comments, user_id: userId};
    // const jsonBodys = project_task_id ? {
    //     project_id,
    //     project_task_id,
    //     comments
    // }
    // : parent_comment_id ? {
    //     project_id,
    //     parent_comment_id,
    //     comments
    //   } :{
    //       project_id,
    //       comments
    //   };
    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(globals.vtigerUrl + file, requestOptions).then(handleResponse)
}

function updateStatus(project_task_id, status) {
    const requestOptions = {
        method: 'GET',
    };
    const {userId} = JSON.parse(localStorage.getItem('user')).info;
    return fetch(globals.vtigerUrl + 'update_workorder_status.php?project_task_id=' + project_task_id + '&status=' + status + '&user_id=' + userId, requestOptions).then(handleResponse)
}

function createOperation(data, type) {
    const jsonBody = {
        'operation': 'create',
        'sessionName': sessionId,
        'element': JSON.stringify(data),
        'elementType': type
    };

    const formData = new FormData();

    for (let k in jsonBody) {
        formData.append(k, jsonBody[k]);
    }
    const req = {
        method: 'post',
        body: formData
    };

    return fetch(globals.vtigerUrl + 'webservice.php', req).then(handleResponse)
}

function queryOperation(query) {
    const req = {
        method: 'get'
    };
    return fetch(globals.vtigerUrl + 'webservice.php?operation=query&sessionName=' + sessionId + '&query=' + query, req)
        .then(handleResponse)
}
