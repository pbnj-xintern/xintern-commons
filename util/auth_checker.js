const jwt = require('jsonwebtoken');

module.exports = (token, secret) => {
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return false;
    }
};

module.exports.decodeJWT = (token) =>{
    try{
        return jwt.decode(token)
    }catch(error){
        return false;
    }
}