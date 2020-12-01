module.exports.errorSerializer = function (props, err) {
    let data = {};
    if (err) {
        for (let i in props) {
            if ((typeof props[i]) === 'object') {
                if (err.errors[props[i][0]]) {
                    data[props[i][1]] = err.errors[props[i][0]].message;
                }
            } else {
                if (err.errors[props[i]]) {
                    data[props[i]] = err.errors[props[i]].message;
                }
            }

        }
    }
    return {"errors": data};
}