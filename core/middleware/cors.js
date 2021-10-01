import corsMiddleware from "cors"

const corsOptions = {
  origin: (original, callback) => {
    callback(null, true)
  }
}

export const cors = corsMiddleware(corsOptions)
