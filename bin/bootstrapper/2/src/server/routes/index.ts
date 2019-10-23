// This file will be used to load your component into the
// application as a whole. It is expected that there will
// be a single default export for the router object.

import { Router, Request, Response } from "express";
import { authorize } from "@core";

// Initialize the router
const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success!"
  });
});

export default routes;
