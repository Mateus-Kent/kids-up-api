import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

class AuthController {

  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "This user don't exists" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "This password is not the same" });
    }

    const token = jwt.sign({ ...user }, "secret", {});

    return res.json({
      user,
      token,
    });
  }

  async register(req: Request, res: Response) {
    const repository = getRepository(User);
    const { username, email, phone_number, password, profile_photo } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "This user already exists" });
    }

    const user = await repository.create({
      username,
      email,
      phone_number,
      password,
      profile_photo,
      isCaregiver: false
    });
    await repository.save(user);


    const token = jwt.sign({ ...user }, "secret", {});


    console.log(req.headers);

    return res.json({ user, token });
  }
}
export default new AuthController();
