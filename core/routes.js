import { Router } from "express";

import { usersRouter } from "../modules/users/routes"
import { projectsRouter } from "../modules/projects/routes";

const moduleRouters = [
  usersRouter,
  projectsRouter
]

export const apiRouter = Router()
for (const moduleRouter of moduleRouters)
  apiRouter.use('/', moduleRouter)
