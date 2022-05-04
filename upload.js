import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'

dotenv.config()

const connection = mongoose.createConnection(process.env.MONGODB)

let gfs, gridfsBucket

connection.once('open', () => {
	gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
		bucketName: 'files'
	})
	gfs = new Grid(connection.db, mongoose.mongo)
	gfs.collection('files')
})

//Create storage engine
const storage = new GridFsStorage({
	url: process.env.MONGODB,
	file: (_, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err)
				}
				const filename = buf.toString('hex') + path.extname(file.originalname)
				const fileInfo = {
					filename: filename,
          url: `${process.env.APP_URL}/api/v1/files/${filename}`,
					bucketName: 'files'
				}
				resolve(fileInfo)
			})
		})
	}
})

const upload = multer({ storage })

export { upload, gfs, gridfsBucket }