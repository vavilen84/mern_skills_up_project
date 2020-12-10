exports.getAuthToken = function (req) {
    let token = req.header('Authorization');
    if (!token) {
        return "";
    }
    const splitted = token.split(" ");
    if (splitted[1]) {
        return splitted[1];
    }
    return "";
}