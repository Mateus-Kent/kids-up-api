import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Parent from '../models/Parent'

class ParentController {


  async Update(req: Request, res: Response) {

    const { email } = req.body

    const toUpdate = req.body;

    delete toUpdate.email;

    const repository = await getRepository(Parent)

    if (!email) {
      return res.status(401).json({ message: 'You have to be logged to update the username' })
    }

    const parent = await repository.findOne({ email })

    if (!parent) {
      return res.status(401).json({ message: 'This user don\'t exist' })
    }

    await repository.update(parent, toUpdate);

    return res.json({ ...parent, ...toUpdate });
  }

}

export default new ParentController();