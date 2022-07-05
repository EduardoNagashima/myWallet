import { Router } from "express";

import {signIn, signUp} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);

export default userRouter;