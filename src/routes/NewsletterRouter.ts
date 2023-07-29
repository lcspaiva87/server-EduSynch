// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import { Newsletter } from '../controller/Newsletter/NewsletterController'

async function newsletterRoutes(fastify: FastifyInstance) {
  fastify.post('/newsletter', Newsletter)
}

export default newsletterRoutes
