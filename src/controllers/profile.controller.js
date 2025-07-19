//vamos a rmar el controlador que suba la imagen y el que pide la imagen del ususario
import User from '../models/user.model.js';
import fs from 'fs';
import path  from 'path';
import { json } from 'stream/consumers';
import { fileURLToPath } from 'url';

//obtener el __dirname en ES module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadProfileImage = async (req, res)=>{
    try {
        if(req.fileValidationError){
            return res.status(400).json({message: req.fileValidationError});
         }

         //aca valido que se haya subido una imagen
         if(!req.file){
            return res.status(400).json({message:' no se ha subido ninguna imagen'});
         }

         const userId = req.user.id;
         const user = await User.findById(userId);

         if(!user){
            //si no hay usuario debo borrar la imagen que subio
            fs.existsSync(path.join(__dirname, `../../public/uploads/profile/${req.file.filename}`)) && fs.unlinkSync((__dirname, `../../public/uploads/profile/${req.file.filename}`))// si hay un error con el usuario este metodo va a borrar la imagen que se creo
            return res.status(404).json({message:'usuario no encontrado'})
         }

      //si el usuario ya tienen una imagen de perfil la eliminamos

      if(user.profileImage){
        const oldImagePath = path.join(__dirname, '../../public/uploads/profile', path.basename(user.profileImage))
        if(fs.existsSync(oldImagePath)){
            fs.unlinkSync(oldImagePath)
        }
      }

      //actualizar la imagen del perfil del usuario en mongo DB 

      const imageUrl = `/uploads/profile/${req.file.filename}`;

      user.profileImage = imageUrl;
      await user.save()

      res.status(200).json({
        message:'imagen de perfil actualizada correctamente',
        profileImage : imageUrl

      })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'error al subir la imagen de perfil'});
        
    }
}

export const getProfileImage = async (req, res) =>{
    try {
        
        const userId = req.user.id; //traigo de la info del usuario a travez del midleware de authrequired quien inyecta la info desde el token

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:'usuario no encontrado'})
        }

        if(!user.profileImage){
            res.status(404).json({message:'el usuario no tiene fot del perfil'})
        }

        res.status(200).json({
            profileImage : user.profileImage
        })

    } catch (error) {
     console.log(error);
     res.status(500).json({message:'error al obtener la imgagen de perfil'})   
    }
    
}