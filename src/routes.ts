import { Router } from "express";

import ParentController from "./controllers/ParentController";

const router = Router();

router.post('/parents', (req, res) => ParentController.store(req, res));

export default router;