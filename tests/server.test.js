import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'


dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type,token'
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.get('/api/v1', (_, res) => {
    res.status(200).send('Server is OK')
})



app.use('/api/v1', routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))





// Unit Tests

describe('Testing the server status', () => {
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/api/v1')
        expect(response.statusCode).toBe(200)
    })
})

describe('Testing users routes', () => {
    it('should return all users', async () => {
        const response = await request(app).get('/api/v1/users')
        expect(response.statusCode).toBe(200)
    }) 



    it('should create an user', async () => {
        const response = await request(app).post('/api/v1/users')
        .send({
            first_name: 'Super',
            last_name: 'Test',
            address: {
                road: 'Jest',
                zipcode: 76,
                city: 'Jest City'
            },
            birth_date: '07/06/1995',
            phone: '0123',
            mail: 'jest@mail.com',
            password: 'motdepasseenclair',
            role: 'Admin'
        })
        expect(response.statusCode).toBe(200)
        // expect(response.body).toBe(json)
    })

//     // it('should update an user', async () => {
//     //     const response = await request(app).patch('/api/v1/users')
//     //     expect(response.statusCode).toBe(200)
//     // })
//     // it('should delete an user', async () => {
//     //     const response = await request(app).delete('/api/v1/users')
//     //     expect(response.statusCode).toBe(200)
//     // })
 })