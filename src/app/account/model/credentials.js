"use strict";
var Credentials = (function () {
    function Credentials(email, password, rememberMe) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }
    return Credentials;
}());
exports.Credentials = Credentials;
