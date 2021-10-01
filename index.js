import { startAPIServer } from "./core/server";

(async () => {
  try {
    startAPIServer()
  } catch (error) {
    console.log(error)
  }
})()