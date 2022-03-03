import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		title: 'Elecity API',
		description: 'Open documentation for Elecity API'
	},
	host: 'localhost:5000',
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
			"description": "Server state"
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
	]
}
const outputFile = './swagger-output.json'
const endpointFiles = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointFiles, doc).then(async () => await import('./server.js'))