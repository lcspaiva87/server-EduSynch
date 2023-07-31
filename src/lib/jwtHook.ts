import { FastifyInstance, FastifyRequest } from 'fastify'

// Função para verificar o token JWT
async function verifyJWT(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new Error('Token JWT inválido ou não fornecido.')
  }
}

// Hook para verificar o token JWT antes de executar as rotas
export function jwtHook(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await verifyJWT(request)
  })
}
