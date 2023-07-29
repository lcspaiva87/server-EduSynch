import { PrismaClient } from '@prisma/client'
import { UserNewsletter } from '../../models/userAdmin'
import { FastifyReply, FastifyRequest } from 'fastify'

const prisma = new PrismaClient()
async function Newsletter(req: FastifyRequest, reply: FastifyReply) {
  const { email } = UserNewsletter.parse(req.body)

  const RegisterNewsletter = await prisma.newsletter.create({
    data: {
      email,
    },
  })
  reply
    .status(200)
    .send({ message: 'email registrado com sucesso', RegisterNewsletter })
}
export { Newsletter }
