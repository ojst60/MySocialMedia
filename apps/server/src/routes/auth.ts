import { Router, Request, Response } from "express";

const auth = Router();

auth.post("/register", (req: Request, res: Response) => {
    console.log(req)
    res.send(req.body)

});

auth.post("/login", (req: Request, res: Response,) => {});

auth.post("/password-reset", (req: Request, res: Response) => {});

auth.post("/token-refresh", (req: Request, res: Response) => {});


export default auth