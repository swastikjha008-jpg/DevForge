import { Router } from "express";
import { generateRouter } from "./generate.routes";
import { downloadRouter } from "./download.routes";

export const apiRouter = Router();
apiRouter.use("/api", generateRouter);
apiRouter.use("/downloads", downloadRouter);
