function Response (code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
}

function setDefaultRespHeaders(res) {
    res.setHeader("Cache-control", "no-cache, no-store, must-revalidate")
    res.setHeader("Content-Type", "application/json")
}

module.exports.sendOK = function (res, data, message) {
    setDefaultRespHeaders(res);
    res.statusCode = 200;
    res.send(new Response(200, message, data));
}