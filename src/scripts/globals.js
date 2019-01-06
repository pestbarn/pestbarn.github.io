exports.setObj = function setObj(key, value) {
    Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };
    return localStorage.setObject(key, value);
}

exports.getObj = function getObj(key) {
    Storage.prototype.getObject = function (key) {
        let value = this.getItem(key);
        return value && JSON.parse(value);
    };
    return localStorage.getObject(key);
}
