import express, { type Application } from 'express'

export const createApp = (): Application => {
  const app = express()

  app.use(express.json())

  return app
}
