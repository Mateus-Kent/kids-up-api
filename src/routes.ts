import { Router } from "express";

import Middleware from "./middlewares/AuthMiddleware"
import ParentController from "./controllers/ParentController";
import AuthController from "./controllers/AuthController";

const router = Router();

router.post('/parents', (req, res) => ParentController.store(req, res));

router.post('/auth', (req, res) => AuthController.authenticate(req, res));

router.get('/parents', Middleware, (req, res) =>  ParentController.index(req, res));

export default router;