import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/routes.js'


// Pour lancer dotenv
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()



// const swaggerDocs = swaggerJsDoc(swaggerOptions)
// console.log(swaggerDocs)


app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/V1',routes)


mongoose.connect(process.env.MONGODB)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))