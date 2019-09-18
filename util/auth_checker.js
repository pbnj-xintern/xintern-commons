const jwt = require('jsonwebtoken');

module.exports.checkAuth = (token, secret) => {
    try{
        const decoded = jwt.verify(token, secret);
        return decoded;
    }catch(error){
        return false;
    }
};