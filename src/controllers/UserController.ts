import { Request, Response } from "express"
import { getRepository } from "typeorm"

import User from "../Models/User"

class UserController {
  async Update(req: Request, res: Response) {
    const { email } = req.user

    console.log(req.user)

    const toUpdate = req.body

    const repository = await getRepository(User)

    if (!email) {
      return res.status(401).json({ message: "The field email is necessary" })
    }

    console.log("passou email")

    const user = await repository.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "This user don't exist" })
    }

    console.log(toUpdate)

    await repository.update(user, toUpdate)

    return res.json({ ...user, ...toUpdate })
  }
}

export default new UserController()
