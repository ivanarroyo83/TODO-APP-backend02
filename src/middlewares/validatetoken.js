import jwt from 'jsonwebtoken';


export const authRequired = (req, res, next)=>{
       console.log(process.env.SECRET_KEY);
       
      //leer token headers o de las cookies
      let token = null;

      //1 desde la cabecera de autenticacion capturamos el token

      const authHeader = req.headers.authorization;
      if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split("")[1];
      }

      //si no esta en la cabecera buscamos el token en la cookies

      if(!token && req.cookies?.token){
        token = req.cookies.token
      }

      //si no hay token en ningun lado reechazamos

      if(!token) return res.status(401).json({message:'no token provided'})

      //verificar el token
      
      jwt.verify(token, process.env.SECRET_KEY, (err, userDecoded)=>{
        if(err) return res.status(401).json({message:'invalid token'})
            req.user = userDecoded;
        next()
      })
}