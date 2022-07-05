import { Router } from "express";

import {postNewValue, getValue, getBalance} from "./../controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", postNewValue);
financialRouter.get("/financial-events", getValue);
financialRouter.get("/financial-events/sum", getBalance);

export default financialRouter;