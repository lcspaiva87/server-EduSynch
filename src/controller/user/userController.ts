import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserLogin, UserSchema } from '../../models/userAdmin'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function Registeruser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { avatar, email, name, password } = UserSchema.parse(req.body)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }
    // Criptografa a senha antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
      },
    })
    reply.status(200).send({ message: 'User registered successfully', user })
  } catch (error) {
    reply.status(400).send({ message: error.issues[0].message })
  }
}
async function LoginUser(
  req: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance,
) {
  try {
    const { email, password } = UserLogin.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }
    // Gera um token de autenticação usando @fastify/jwt
    const token = await reply.jwtSign({ userId: user.id })
    console.log(token)
    reply.status(200).send({ token })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}
export { Registeruser, LoginUser }
