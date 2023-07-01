var jwt = require('jsonwebtoken');
const JWT_SECRET = 'maruti:-)';

const fetchadmin = (req, res, next) => {

    const token = req.header('auth-token');

    if(!token) {
        res.status(401).send({error: 'Kya kar rha hain yaar tu mazak hain kya'})
    } 
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch(error){
        res.status(401).send({error: 'Kya kar rha hain yaar tu mazak hain kya'})
    }
}


module.exports = fetchadmin;