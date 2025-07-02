import {z} from "zod";
import { email } from "zod/v4";

export const registerSchema = z.object({
username: z
.string({required_error: "Username is required"}),

email: z
.string({required_error: 'email is required'}),
//.email({ pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i}, {message:"Invalid Email"}),//

password: z
.string({required_error: "Password is required"})
.min(6, {message:"Password must be al least 6 characters"})
.max(18, {message: "Password must be al least 18 characters"})
//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {message: "Invalid password"})
})

export const loginSchema = z.object({
    email: z
    .string({required_error:'email is required'})
    .email({message:'invalid email'}),

    password: z
    .string({required_error:'password is required'})
    
    .min(6, {message:"Password must be al least 6 characters"})
    .max(18, {message: "Password must be al least 18 characters"})
    
})