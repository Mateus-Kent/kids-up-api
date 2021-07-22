import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Parent from '../models/Parent'

class ParentController{
  
  
 async Update(req: Request , res: Response) {

  const { email, username, phone_number } = req.body

  const repository = await getRepository(Parent)

  const parent = await repository.findOne({email})

  if(!email){
    return res.status(401).json({message: 'You have to be logged to update the username'})
  }

  if(!parent){
    return res.status(401).json({message: 'This user don\'t exist'})
  }

  const updatedParent = await repository.update(parent, { username });

    return res.json(updatedParent);
  }

  async UpdatePhoneNumber(req: Request , res: Response) {

    const { email, phone_number } = req.body
  
    const repository = await getRepository(Parent)
  
    const parent = await repository.findOne({email})
  
    if(!email){
      return res.status(401).json({message: 'You have to be logged to update the username'})
    }
  
    if(!parent){
      return res.status(401).json({message: 'This user don\'t exist'})
    }
  
    const updatedParent = await repository.update(parent, { phone_number });
  
    return res.json(updatedParent);
  }
}


export default new ParentController();