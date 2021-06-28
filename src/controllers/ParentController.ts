import { Request, Response } from 'express'

class ParentController{
 store(req: Request, res: Response){
  return res.send('ok');
 }
}
export default new ParentController();