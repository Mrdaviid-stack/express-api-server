import { Router } from "express"
import { users } from "./Users"

export const usersRouter = Router()
  .use(users)