import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";

import Middleware from "./middlewares/AuthMiddleware";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";

const router = Router();

router.post(
  "/parents",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      phone_number: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (
            !/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(
              value
            )
          ) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
      password: Joi.string().min(4).max(22).required(),
      profile_photo: Joi.string(),
    }),
  }),
  (req, res) => AuthController.register(req, res)
);

router.post(
  "/auth",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(4).max(22).required(),
    }),
  }),
  (req, res) => AuthController.authenticate(req, res)
);

router.put("/parents", Middleware, (req, res) => UserController.Update(req, res));

router.use(errors());

export default router;
