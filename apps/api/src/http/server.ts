import { errorHandler } from '@/http/error-handler'
import { authenticateWithGithub } from '@/http/routes/auth/authenticate-with-github'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { createAccount } from '@/http/routes/auth/create-account'
import { getProfile } from '@/http/routes/auth/get-profile'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { createOrganization } from '@/http/routes/orgs/create-organization'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@saas/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next SaaS RBAC',
      description: 'Full-Stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

// auth routes
app.register(createAccount)
app.register(authenticateWithGithub)
app.register(authenticateWithPassword)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(getProfile)

// org routes
app.register(createOrganization)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`Server listening on http://localhost:${env.SERVER_PORT}`)
})
