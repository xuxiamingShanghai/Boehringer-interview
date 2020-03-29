const methods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

const contentType = {
    json: 'application/json'
};


// export const endpoints = {
//     BACKEND_STATUS: {path: 'api/v1.0/status', method: methods.GET, param: null},
//     GET_IMAGE: {path: 'api/v1.0/image/<image>', method: methods.GET, param: null},
//     UPLOAD_IMAGE: {path: 'api/v1.0/image/<image>', method: methods.POST, headers: {'content-type': contentType.json}, authentication: true, param: {picture: ''}}
// };

export const endpoints = {
    BACKEND_STATUS: 'api/v1.0/status',
    GET_PICTURE: 'api/v1.0/image/<image>',
    UPLOAD_PICTURE: 'api/v1.0/ranking'
};
