import { errorHandler } from '@/http/error-handler'
import { authenticateWithGithub } from '@/http/routes/auth/authenticate-with-github'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { createAccount } from '@/http/routes/auth/create-account'
import { getProfile } from '@/http/routes/auth/get-profile'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { getMembers } from '@/http/routes/members/get-members'
import { removeMember } from '@/http/routes/members/remove-member'
import { updateMember } from '@/http/routes/members/update-member'
import { createOrganization } from '@/http/routes/orgs/create-organization'
import { getMembership } from '@/http/routes/orgs/get-membership'
import { getOrganization } from '@/http/routes/orgs/get-organization'
import { getOrganizations } from '@/http/routes/orgs/get-organizations'
import { shutdownOrganization } from '@/http/routes/orgs/shutdown-organization'
import { transferOrganization } from '@/http/routes/orgs/transfer-organization'
import { updateOrganization } from '@/http/routes/orgs/update-organization'
import { createProject } from '@/http/routes/projects/create-project'
import { deleteProject } from '@/http/routes/projects/delete-project'
import { getProject } from '@/http/routes/projects/get-project'
import { getProjects } from '@/http/routes/projects/get-projects'
import { updateProject } from '@/http/routes/projects/update-project'
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

// profile routes
app.register(getProfile)

// org routes
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

// project routes
app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

// member routes
app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`Server listening on http://localhost:${env.SERVER_PORT}`)
})
