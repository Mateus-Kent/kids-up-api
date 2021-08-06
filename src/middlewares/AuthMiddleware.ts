import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

export default async function authMiddle(req: Request, res: Response, next: NextFunction){

 const { authorization } = req.headers;

 if(!authorization) {
  return res.status(401).json({ message: "Have to be a authorization" });
 }

 const token = authorization.replace('Bearer', '').trim();

 try{
  const data = await jwt.verify(token, 'secret');

  req.user = data;
  console.log(req.user);
  next();
 } catch {
  return res.status(401).json({ message: "Have to be a authorization" });
 }

}