import { createApp } from '@/app.js'
import { env } from '@/config/env.js'
import { logger } from '@/utils/logger.js'
import { createServer } from 'node:http'

const main = async () => {
  try {
    const app = createApp()
    const server = createServer(app)

    const port = env.AUTH_SERVICE_PORT

    server.listen(port, () => {
      logger.info({ port }, 'Auth service is running')
    })

    const shutdown = () => {
      logger.info('Shutting down auth service...')

      Promise.all([])
        .catch((error: unknown) => {
          logger.error({ error }, 'Error shutting down auth service')
        })
        .finally(() => {
          server.close(() => process.exit(0))
        })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (error) {
    logger.error({ error }, 'Failed to start auth service')
    process.exit(1)
  }
}

void main()
