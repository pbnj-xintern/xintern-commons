const jwt = require('jsonwebtoken');

module.exports.checkAuth = (token, secret) => {
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return false;
    }
};