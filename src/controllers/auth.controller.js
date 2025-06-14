

export const home = (req, res) =>{
    res.send('esat es la ruta home para los usuarios')//mensaje de bienvenida

}

export const about = (req, res)=> {
    res.send(' esat es la ruta de about')
}


 export const getUser = (req, res)=> {
    try {
        const {username, email, edad, password} = req.body;//obetngo el body de la peticion
        if(!username || !email || !edad || !password ){
            return res.status(400).json({message:'no se envio informacion del usuario'})
        }
        console.log(req.body);
        
        return res.status(200).json({
            user:{
                username,
                email,
                edad,
                password
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'error obteniendo el usuario'})
        
        
    }
 } 
