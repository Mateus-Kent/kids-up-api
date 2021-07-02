import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';

import Middleware from "./middlewares/AuthMiddleware"
import ParentController from "./controllers/ParentController";
import AuthController from "./controllers/AuthController";

const router = Router();

router.post('/parents',celebrate({
 [Segments.BODY]: Joi.object().keys({
   username: Joi.string().required(),
   email: Joi.string().email().lowercase().required(),
   phone_number: Joi.string().required().custom((value, helpers) => {
     if (!/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(value)) {
       return helpers.error('any.invalid')
     }
     return value;
   }),
   password: Joi.string().min(4).max(22).required(),
   profile_photo: Joi.string().required(),
 }),
 [Segments.QUERY]: {
   token: Joi.string().token().required()
 }
}), (req, res) =>  ParentController.store(req, res));



router.post('/auth', (req, res) => AuthController.authenticate(req, res));

router.get('/parents', Middleware, (req, res) =>  ParentController.index(req, res));

router.use(errors());

export default router;