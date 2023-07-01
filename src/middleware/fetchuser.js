var jwt = require('jsonwebtoken');
const JWT_SECRET = 'qcVR1cq#@cadAC#$@QVcawdcRE';

const fetchuser = (req, res, next) => {

    // const token = req.headers('auth-token');
    const token = req.header('auth-token');

    if(!token) {
        console.log("1")
        res.status(401).send({success:'false'})
    } 

    try {
        console.log("2")
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch(error){
        res.status(401).send({success:'false'})
    }
}

module.exports = fetchuser;