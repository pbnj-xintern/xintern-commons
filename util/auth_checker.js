const jwt = require('jsonwebtoken');

module.exports = (token, secret) => {
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return false;
    }
};