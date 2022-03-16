
const jwt = require("jsonwebtoken")




const authenticate = async function(req, res, next) {
    let header = req.headers["x-api-key"]
    if(!header) return res.send('token must')

    const verify = jwt.verify(header,"project1_room4")
    if(!verify) return res.status(404).send('invaild token')
    next()

}
const authorisation= function(req,res,next){
    let authortobemodified = req.params.authorid

    let token = req.headers["x-api-key"];
    if(!token) return res.send({status:false, mssg:"token must be present"});
    
    let decodedtoken= jwt.verify(token, "project1_room4");
    if(!decodedtoken) return res.send({status:false,mssg:"invalid token"})
    let userloggedin = decodedtoken.userId

    if(authortobemodified!= userloggedin ) return res.send({status:false, mssg:"loggedin person is not allow to access the request"})

    next()
}
module.exports.authenticate = authenticate
module.exports.authorisation = authorisation