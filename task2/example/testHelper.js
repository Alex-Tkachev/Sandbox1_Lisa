function isValid(response) { // 200 is not the only success code
    return response.code == 200;
}

function httpError(response) {
    var error = new Error();
    error.message = typeof response.body == "string" ? response.body : "Look response for details";
    error.response = response;
    error.code = response.code;
    return error;
}

function warn(e) {
    console.warn(e.code, e.message)
}
var log = console.dir.bind(console);
var err = console.error.bind(console);


function logCb(e, response) {
    if (e) {
        return err(e.message);
    }
    if (!isValid(response)) {
        return warn(httpError(response));
    }
    log(response.body);
}


function validateSuccess(response) {
    if (!isValid(response)) {
        throw httpError(response);
    }
    return response.body
}

function logFull(promise){
    return promise.catch(err).then(validateSuccess).then(log).catch(warn)
}