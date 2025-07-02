import jwt from 'jsonwebtoken';


export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: 'no token provided'});

    jwt.verify(token, process.env.SECRET_KEY, (err, userDecoded) =>{
        if(err) return req.status(403).json({message:'invalid token'}),
        req.user = userDecoded;
        return next();
    } ) 
}