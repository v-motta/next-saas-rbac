import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { roleSchema } from '@saas/auth'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
      '/invites/:inviteId',
      {
        schema: {
          tags: ['invites'],
          summary: 'Get an invite',
          params: z.object({
            inviteId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              invite: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                email: z.string().email(),
                createdAt: z.date(),
                author: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().url().nullable(),
                }).nullable(),
                organization: z.object({
                  name: z.string(),
                })
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { inviteId } = request.params

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
          },
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
            organization: {
              select: {
                name: true,
              },
            }
          }
        })

        if (!invite) {
          throw new BadRequestError('Invite not found')
        }

        return { invite }
      }
    )
}