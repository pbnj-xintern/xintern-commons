const jwt = require('jsonwebtoken');
const middy = require('middy')
module.exports.verifyJWT = (secret) => {
    return ({
        before: (handler, next) => {
            let token = handler.event.headers.Authorization.replace("Bearer ", "");
            try {
                jwt.verify(token, secret);
                next()
            } catch (error) {
                console.log(error)
                return handler.callback();
            }
        }
    })
};

module.exports.decodeJWT = (token) => {
    try {
        return jwt.decode(token)
    } catch (error) {
        return false;
    }
}