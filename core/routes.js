import { Router } from "express";

import { usersRouter } from "../modules/users/routes"

const moduleRouters = [
  usersRouter
]

export const apiRouter = Router()
for (const moduleRouter of moduleRouters)
  apiRouter.use('/', moduleRouter)
