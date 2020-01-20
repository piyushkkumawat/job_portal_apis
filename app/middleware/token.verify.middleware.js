const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    var token
    if(req.headers['x-access-token']){

         token = req.headers['x-access-token'];
    }
    else{

         token = req.headers.authorization.split('Bearer')[1].trim();
    }
    console.log(token);
    if (!token)
        return res.json({ success: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.json({ success: false, message: 'Authentication failed' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}


module.exports = verifyToken;