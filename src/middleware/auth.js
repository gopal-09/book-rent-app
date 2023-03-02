const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY
auth=async(req, res, next) => {
    const token = req.header('x-auth-token')

    // CHECK IF WE EVEN HAVE A TOKEN
    if(!token){
        res.status(401).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    }

    try {
        const user = await jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g")
        // const lmd=jwt.decode(token)
        rq.userId = decoded.id
      rq.role = decoded.role
      rq.email = decoded.email
        next()}
    catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        })
    }
}
isAdmin=(req,res,next) => {
    const userRole = rq.role;
    if (userRole.toLowerCase() == "admin") {
        next()
      } else {
        return res.send(rs, "'Require Admin Role!", 403)
      }
}
module.exports ={auth,isAdmin}
