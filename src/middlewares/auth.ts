import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const auth = async(req: Request, res: Response, next: NextFunction)=>{

     const authHeader = req.headers.authorization;

     if(!authHeader){
         return res.status(401).json({ message: 'Token is required' });
     }

     //Bearer 57637ruheiofjioghuidhus
     const [, token] = authHeader.split(' ');

     try{
       
        await jwt.verify(token, process.env.APP_SECRET_KEY);
        next();

     }catch(err){
        
        return res.status(401).json({ message: 'Token Invalid' });

     }

}


