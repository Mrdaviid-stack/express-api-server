import { Router } from "express";
import { projects } from "./projects";

export const projectsRouter = Router()
  .use(projects)