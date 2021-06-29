import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Parent from '../models/Parent';

class AuthController{
async authenticate(req: Request, res: Response){
  const repository = getRepository(Parent);
  const { email,  password} = req.body;

  const parent = await repository.findOne({ where: { email }});
   
  if(!parent) {
    return res.status(401).json({ message: "This user don't exists" });
  }

  const isValidPassword = await bcrypt.compare(password, parent.password);

  if(!isValidPassword) {
    return res.status(401).json({ message: "This password don't exists" });
  }
 
  const token = jwt.sign({ id: parent.id}, 'secret', {});

  return res.json({
    parent,
    token,
  });
}
}
export default new AuthController();