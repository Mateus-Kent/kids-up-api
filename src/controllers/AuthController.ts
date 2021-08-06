import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Parent from "../models/Parent";

class AuthController {

  async authenticate(req: Request, res: Response) {
    const repository = getRepository(Parent);
    const { email, password } = req.body;

    const parent = await repository.findOne({ where: { email } });

    if (!parent) {
      return res.status(401).json({ message: "This user don't exists" });
    }

    const isValidPassword = await bcrypt.compare(password, parent.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "This password is not the same" });
    }

    const token = jwt.sign({ ...parent }, "secret", { expiresIn: '30s'});

    return res.json({
      parent,
      token,
    });
  }

  async register(req: Request, res: Response) {
    const repository = getRepository(Parent);
    const { username, email, phone_number, password, profile_photo } = req.body;

    const parentExists = await repository.findOne({ where: { email } });

    if (parentExists) {
      return res.status(409).json({ message: "This parent already exists" });
    }

    const parent = await repository.create({
      username,
      email,
      phone_number,
      password,
      profile_photo,
    });
    await repository.save(parent);

    const token = jwt.sign({ ...parent }, "secret", {});

    console.log(req.headers);

    return res.json({ parent, token });
  }
}
export default new AuthController();
