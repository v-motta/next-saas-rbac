import { UnauthorizationError } from '@/http/routes/_errors/unauthorized-error'

import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizationError('Invalid auth token')
      }
    }
  })
})
