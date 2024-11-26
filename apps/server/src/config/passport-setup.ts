import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { User as UserModel } from "../models/User";
import { Express } from "express";
import { env } from "../validation/env";

interface SerializedUser extends Express.User {
  email: string;
  id: string;
}

// Serialize user to store in session
passport.serializeUser((user, done) => {
  const currentUser = user as SerializedUser;
  return done(null, currentUser.email);
});

// Deserialize user from session
passport.deserializeUser(async (email: string, done) => {
  try {
    const user = await UserModel.findOne({email});
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/login/google/redirect",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        // Safely extract email
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) {
          return done(new Error("No email found in Google profile"), false);
        }

        // Check if user already exists
        let existingUser = await UserModel.findOne({ email });

        if (existingUser) {
          // Update googleId if not set
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
            await existingUser.save();
          }
          return done(null, existingUser);
        }

        // Create a new user
        const newUser = await new UserModel({
          googleId: profile.id,
          email,
          username: profile.displayName,
        }).save();
        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
