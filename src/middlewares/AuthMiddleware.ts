import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

export default function authMiddle(req: Request, res: Response, next: NextFunction){

 const { authorization } = req.headers;

 if(!authorization) {
  return res.status(401).json({ message: "Have to be a authorization" });
 }

 const token = authorization.replace('Bearer', '').trim();

 try{
  const data = jwt.verify(token, 'secret');
  console.log(data);
 } catch {
  return res.status(401).json({ message: "Have to be a authorization" });
 }

}