import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		title: 'Elecity API',
		description: 'Open documentation for Elecity API'
	},
	host: 'elecity-api.herokuapp.com',
	schemes: ['http', 'https'],
	security: {
		bearerAuth: []
	},
	securityDefinitions: {
		bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT'
		}
	},
	tags: [
		{
			"name": "API root",
			"description": "return the API state"
		},
		{
			"name": "Users",
			"description": "Users routes" 
		},
		{
			"name": "Cars",
			"description": "Cars routes"
		},
		{
			"name": "Offers",
			"description": "Offers routes"
		},
		{
			"name": "Rents",
			"description": "Rents routes"
		}
	],
	components: {
		schemas: {
			user: {
				first_name: 'John',
				last_name: 'Doe',
				address: {
					street: '225 Demo Road',
					zipcode: 4125,
					city: 'Los Angeles'
				},
				birth_date: '07/06/1995',
				phone: '+33 0 00 00 00 00',
				mail: 'johndoe@mail.com',
				password: 'crypted_password',
				role: 'user'
			},
			car: {
				car_available: true,
				car_brand: 'Tesla',
				car_model: 'Y',
				car_category: 'SUV',
				car_color: 'red',
				car_state: 10,
				car_kilometer: 93000,
				car_history: {  
					car_purchase: '05/02/2022',
					car_crashed: true,
					crash_history: 'Pneu crevé'
				}
			},
			offer: {
				offer_name: 'Starter',
				offer_price: 9,
				offer_description: 'Louez une petite citadine pour des trajets cours, 9€ /h',
				offer_duration: 8
			},
			rent: {
				rent_date: '2022-03-03T09:30:00Z',
				rent_finish: '2022-03-03T14:00:00Z',
				client_id: '972cdab5413',
				car_id: '461abcc1203'
			}
		}
	}
}
const outputFile = './swagger-output.json'
const endpointFiles = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointFiles, doc)