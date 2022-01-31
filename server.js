import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))