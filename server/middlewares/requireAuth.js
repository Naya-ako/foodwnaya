const jwt =require ('jsonwebtoken')

const requireAuth = async( req, res, next) => {

    const {authorisation }= req.headers
    if (authorisation ) return res.status(401).json({error: "Authorisatiom token required"})

    const token= authorisation.split('')[1]

    if (token){
        return res.status(401).json({ error:  "Authorisatiom token required" })

    }

try{
    const { id} = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user_id =id
    next()
} catch (error){
    res.status(401).json({ error: 'Request is not authorised'})

}
}
module.exports = requireAuth

