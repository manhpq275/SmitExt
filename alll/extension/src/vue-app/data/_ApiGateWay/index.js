import axios from "axios";

const API_METHOD = {
    PUT_METHOD: "put",
    GET_METHOD: "get",
    POST_METHOD: "post",
    PATCH_METHOD: "patch",
    DELETE_METHOD: "delete"
}

export default class ApiGateWay {
    _endpoint;
    _timeOut = 3000;
    cookies;
    params;

    constructor(settings) {
        this._endpoint = settings.endpoint || "";
    }

    callApiHandle = (resource, method, body, bodyType) => {
        const { path, type } = resource;
        const endpoint = this._endpoint;
        const url = `${endpoint}${path}`;

        const config = {
            url,
            method,
            data: body,
            params: this.params,
            withCredentials: true,
            timeout: this._timeOut,
            headers: this.headerConfig(type),
        };

        return axios(config)
            .then((res) => this.handleSuccess(res.data))
            .catch((err) => this.handleError(err.response.data));
    };

    getRequest(resource) {
        return this.callApiHandle(resource, API_METHOD.GET_METHOD);
    }

    postRequest(resource, body) {
        return this.callApiHandle(resource, API_METHOD.POST_METHOD, body);
    }

    putRequest(resource, body) {
        return this.callApiHandle(resource, API_METHOD.PUT_METHOD, body);
    }

    patchRequest(resource, body) {
        return this.callApiHandle(resource, API_METHOD.PATCH_METHOD, body);
    }

    deleteRequest(resource, body) {
        return this.callApiHandle(resource, API_METHOD.DELETE_METHOD, body);
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        throw new Error(error.message || error);
    }

    headerConfig(type) {
        let headerRequest = {};
        const accessToken = localStorage.getItem("jwt");
        headerRequest["Authorization"] = `Bearer ${accessToken}`;

        if (type === "file") {
            headerRequest["responseType"] = "arrayBuffer";
            headerRequest["Content-Type"] = "multipart/form-data";
        }

        return headerRequest;
    }
}
