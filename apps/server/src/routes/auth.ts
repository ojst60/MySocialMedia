import { Router, Request, Response } from "express";
import { validateRequestData } from "../middleware/validateData";
import { login, register, logout } from "../controllers/auth";
import { UserSchema } from "../models/User";

const auth = Router();

auth.route("/register").post(validateRequestData(UserSchema), register);

auth.route("/login").post(login);

auth.route("/logout").post(logout);

auth.route("/me");

export default auth;
