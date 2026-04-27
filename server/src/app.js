import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { isAllowedCorsOrigin } from './config/supabaseClient.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import router from './routes/index.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedCorsOrigin(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed by CORS'))
    },
    credentials: true,
  }),
)
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json())

app.use('/api', router)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
