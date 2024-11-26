import { NextFunction, Router, Request, Response } from "express";
import { login, register, logout } from "../controllers/auth";
import passport from "passport";

const auth = Router();

// Register route
auth.route("/register").post(register);

// Native Login route
auth.route("/login").post(login);

// Google login route
auth.route("/login/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google login callback
auth
  .route("/login/google/redirect")
  .get(
    passport.authenticate("google", { failureRedirect: "/", session: true }),
    (req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

// Logout route
auth.route("/logout").post(logout);

// User info route (e.g., to get user details)
auth.route("/me").get((req, res) => {
  res.status(200).send("User info");
});

// Another placeholder route for Google login (if needed)
auth.route("/google-login").post((req, res) => {
  res.status(200).send("Google login not implemented yet");
});

export default auth;
