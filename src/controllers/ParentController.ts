import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Parent from '../models/Parent'

class ParentController{

  index(req: Request , res: Response) {
    return res.send('ok');
  }
}
export default new ParentController();