const jwt = require('jsonwebtoken');
const middy = require('middy')
const Status = require('@pbnj-xintern/xintern-commons/util/status')
module.exports.verifyJWT = (secret) => {
    return ({
        before: (handler, next) => {
            let token = handler.event.headers.Authorization.replace("Bearer ", "");

            try {
                jwt.verify(token, secret);
                next()
            } catch (error) {
                return handler.callback(null, Status.createErrorResponse(403, "Forbidden"));
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