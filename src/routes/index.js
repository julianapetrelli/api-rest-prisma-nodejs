import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();


router.post("/user", UserController.createUser);

export { router };
