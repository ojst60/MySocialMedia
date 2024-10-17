import { Router, Request, Response } from "express";
import { login, register, logout } from "../controllers/auth";

const auth = Router();

auth.route("/register").post(register);

auth.route("/login").post(login);

auth.route("/logout").post(logout);

auth.route("/me");

export default auth;
