import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import calendarRoutes from './routes/calendarRoutes.js'
import { connectToMongo } from './utils/connect.js'

const app = express()

connectToMongo()


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/calendars', calendarRoutes)
app.use('/uploads', express.static('uploads'))



export default app