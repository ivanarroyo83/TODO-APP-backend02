import User from '../models/user.model.js'
import { createAccessToken} from "../helpers/jwt.js";
import transport from "../helpers/mailer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





export const requestPasswordReset = async (req, res) => {
    try {
        
        const {email} = req.body;
        // 1 validar el email
        if(!email){
            return res.status(400).json({message:'el email es requerido'})
        }

        //2 buscar el usuario
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'usuario no encontrado'})
        }
        // 3 generar el token de reseteo para la password (expirar en una hpra)

        const resetToken = await createAccessToken({
            id: user._id,
            purpose: 'reset password'
        })
        // 4 guardar el token y la fecha de expiracion

        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 3600000) //1 hora
        await user.save()

        // 5 wnviar email con el link de reset

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: `"${process.env.APP_NAME} || "TODO-APP" <${process.env.MAIL_USER}> `,
            to: user.email,
            subject: 'instrucciones para reesetear tu contraseña',
            template: 'forgotPassword', //poner el nombre del archivo pero sin la extension
            context:{
                name: user.username,
                link: resetLink,
                subject: 'restablecimiento de la contraseña'
            }

        }
        await transport.sendMail(mailOptions);

        //6 enviar la rrespuesat al cliente
        res.status(200).json({
            message:'email con instrucciones enviado',
            expiresIn: '1h'
        })


    } catch (error) {
        console.error('error en requestpasswordreset',{
            message: error.message,
            stack: error.stack,
            email : error.email
        });

        res.status(500).json({
            message:' error al solicitar la solicitud',
            error: error.message
        })
        
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword} = req.body;

        //1 verificar el token 
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded ) => {
            if(err){
                return res.status(401).json({
                    message: ' token invalido o expirado',
                    error: err.message
                })
            }
           //2 buscar al usuario

        const user = await User.findOne({
            _id: decoded.id,
            passwordResetToken: token,
            passwordResetExpires : {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({
                message: 'usuario no encontrado o token invalido'
            })
        }

        //3 hashear la password

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        //4 actualizar y limpiar token

        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        //5 enviar la respuesat al cliente

        res.status(200).json({
            message:'contraseña actualizada correctamente'
        })


            
        } )

        
    } catch (error) {
        console.error('error en reset password', error);
        res.status(500).json({
            message:'error al resetaear la contraseña',
            error: error.message
        })
        
    }
}