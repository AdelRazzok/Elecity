import { gfs, gridfsBucket } from '../upload.js'
import mongoose from 'mongoose'

export const getFile = async (req, res) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		if (!file || file.length === 0) {
			return res.status(404).json({ err: 'No file exists' })
		}

		// check if image
		if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {

			const readstream = gridfsBucket.openDownloadStreamByName(file.filename)
			readstream.pipe(res)

		} else {
			res.status(404).json({ err: 'Not an image' })
		}
	})
}

export const uploadFile = async (req, res) => {
	res.json({ file: req.file })
}

export const deleteFile = async (req, res) => {

	const obj_id = new mongoose.Types.ObjectId(req.params.id)
	
	gridfsBucket.delete(obj_id, (err, gridStore) => {
		if (err) return res.status(404).json({ err: 'No file exists' })
    
		res.status(200).json({ msg: 'File deleted successfully' })
	})

}