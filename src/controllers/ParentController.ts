import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Parent from "../models/Parent";

class ParentController {
  async Update(req: Request, res: Response) {
    const { email } = req.user;

    console.log(req.user);

    const toUpdate = req.body;

    const repository = await getRepository(Parent);

    if (!email) {
      return res.status(401).json({ message: "The field email is necessary" });
    }

    console.log("passou email")

    const parent = await repository.findOne({ email });

    if (!parent) {
      return res.status(401).json({ message: "This user don't exist" });
    }

    console.log("passou parent")

    console.log(toUpdate)

    await repository.update(parent, toUpdate);

    return res.json({ ...parent, ...toUpdate });
  }
}

export default new ParentController();
