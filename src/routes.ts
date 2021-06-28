import { Router } from "express";

import ParentController from "./controllers/ParentController";

const router = Router();

router.post('/parents', ParentController.store);

export default router;