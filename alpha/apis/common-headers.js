const methodGet = "GET";
const methodPost = "POST";

const getRequestParams = (method, params) => {
    return {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "method": method,
        ...params
    };
}

const getUspsRequest = (payload) => {
    return getRequestParams(methodPost, payload);
};

const getWeatherRequest = () => {
    return getRequestParams(methodGet);
}

const getRepresentativesRequest = () => {
    return getRequestParams(methodGet);
}


module.exports = {
    methodGet,
    methodPost,
    getRequestParams,
    getUspsRequest,
    getWeatherRequest,
    getRepresentativesRequest
};