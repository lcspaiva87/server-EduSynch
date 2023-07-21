import console from 'console'
import 'dotenv/config'
import fastify from 'fastify'
import mongoose from 'mongoose'
const app = fastify()
mongoose
  .connect(String(process.env.DATABASE_URL))
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!')
    app.listen(
      {
        port: 3333,
      },
      () => {
        console.log(`HTTP server running on http://localhost:3333 🚀`)
      },
    )
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err)
    process.exit(1)
  })