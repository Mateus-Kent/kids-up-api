import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Parent from '../models/Parent'

class ParentController{

  index(req: Request , res: Response) {
    return res.send('ok');
  }

async store(req: Request, res: Response){
  const repository = getRepository(Parent);
  const { username, email, phone_number, password, profile_photo } = req.body;

  const parentExists = await repository.findOne({ where: { email }});
   
  if(parentExists) {
   return res.status(409).json({ message: "This parent already exists" })
  }

  const parent = await repository.create({ username, email, phone_number, password, profile_photo })
  await repository.save(parent);

  return res.json(parent);
}
}
export default new ParentController();