import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Parent from '../models/Parent'

class ParentController{
async store(req: Request, res: Response){
  const repository = getRepository(Parent);
  const { username, email, phone_number, password, profile_photo } = req.body;

  const parentExists = await repository.findOne({ where: { email }});
   
  if(parentExists) {
   return res.sendStatus(409)
  }

  const parent = repository.create({ username, email, phone_number, password, profile_photo })
  await repository.save(parent);

  return res.json(parent);
}
}
export default new ParentController();