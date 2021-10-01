import { createServer } from "http"
import express from "express"
import helmet from "helmet"

/* Import the main router */
import { apiRouter } from "./routes"

/* Import custom middleware */
import { cors } from "./middleware/cors"
import { logger } from "./middleware/logger"

const app = express()
const server = createServer(app)

/* Helmet provides important security headers to make your app more secure. */
app.use(helmet())

/* Enables whitelisted CORS. */
app.use(cors)

/* Custom logging middleware. */
app.use(logger)

/* Use a bodyparser for POST requests. */
app.use(express.json())

/* Use all the routes from the main router */
app.use('/', apiRouter)

export const startAPIServer = () => {
  const port = process.env.port
  server.listen(port || 80, () => console.log(`API Server listening on port ${port}.`))
}
