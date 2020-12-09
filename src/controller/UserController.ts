import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const login = async(req: Request, res: Response)=>{

     const { email, password } = req.body;

     const user = await getRepository(User).find({
         where:{
             email
         }
     });
     
     if(user.length > 0){
        
        if(await bcrypt.compare(password, user[0].password)){
            
            const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET_KEY, {
                expiresIn: '7d'
            });

            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                token
            }

            return res.json(data);

        }else{

              return res.status(404).json({ message: 'User Not Found' })

        }

     }else{

        return res.status(404).json({ message: 'User Not Found' })

    }

}

export const saveUser = async(req: Request, res: Response)=>{

   const { name, email, password  } = req.body;

   const passwordHash = await bcrypt.hash(password, 8);

   const user = await getRepository(User).save({
       name,
       email,
       password: passwordHash
   });

   return res.json(user);

}

export const getUsers = async(req: Request, res: Response)=>{
    
     const users = await getRepository(User).find();

     return res.json(users);

}