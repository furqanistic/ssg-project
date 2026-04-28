import app from './app.js'
import { env } from './config/env.js'
import { allowedCorsOrigins } from './config/supabaseClient.js'
app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`)
  console.log(`Allowed CORS origins: ${allowedCorsOrigins.join(', ')}`)
})
