import dotenv from 'dotenv';
dotenv.config();


export const sendMail =()=>{
    console.log(process.env.password)
     console.log(process.env.email)
}
