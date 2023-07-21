import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchema } from "../../models/userAdmin";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function Registeruser(req:FastifyRequest,reply: FastifyReply){
  try {
    const {avatar,email,name,password} =UserSchema.parse(req.body)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }
  } catch (error) {
    
  }

}