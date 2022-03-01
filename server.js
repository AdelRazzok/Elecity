import express from 'express'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import YAML from 'yamljs'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/routes.js'


// Pour lancer dotenv
dotenv.config()

const swaggerDocument = YAML.load('./swagger.yaml')


const PORT = process.env.PORT || 5000
const app = express()

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/api/V1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/V1', routes)



mongoose.connect(process.env.MONGODB)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))