import { FastifyReply, FastifyRequest } from 'fastify'
import { UserSchema } from '../../models/userAdmin'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function Registeruser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { avatar, email, name, password } = UserSchema.parse(req.body)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }
    const handleMissingFields = (missingFields: any) => {
      if (missingFields.length > 0) {
        return reply.status(400).send({
          status: 400,
          message: `Campo${
            missingFields.length > 1 ? 's' : ''
          } ${missingFields.join(', ')} está${
            missingFields.length > 1 ? 'm' : ''
          } vazio${missingFields.length > 1 ? 's' : ''}`,
        })
      }
    }

    const requiredFields = ['name', 'email', 'password', 'avatar']
    const missingFields = requiredFields.filter((field) => !req.body[field])

    // Verificar se existem campos ausentes
    const validationError = handleMissingFields(missingFields)
    if (validationError) {
      return reply.statusCode
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
      },
    })
    reply.status(200).send({ message: 'User registered successfully', user })
  } catch (error) {
    console.error(error)
    reply.status(400).send({ message: error })
  }
}
export { Registeruser }
