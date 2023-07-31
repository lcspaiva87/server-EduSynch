import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  terms: z.boolean(),
  avatar: z
    .string()
    .url()
    .optional()
    .default(
      'https://ogimg.infoglobo.com.br/in/24907109-c86-bcf/FT1086A/avatar-a-lenda-de-aang.jpg',
    ),
})

const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})
const UserNewsletter = z.object({
  email: z.string().email(),
})
export { UserSchema, UserLogin, UserNewsletter }
