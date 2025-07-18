import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim: true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        require: true
    },
    profileImage:{
        type:String,
        default:"https://es.dreamstime.com/l%C3%ADnea-icono-del-negro-avatar-perfil-de-usuario-image121102131",
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    verificationToken:{
        type:String,
        default:null
    },
    passwordResetToken:{
        type:String,
        default:null
    },
    passwordResetExpires:{
        type:Date,
        default:null
    },


},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model('User', userSchema);