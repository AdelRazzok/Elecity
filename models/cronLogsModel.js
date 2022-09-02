import mongoose from "mongoose"

const cronLogsSchema = new mongoose.Schema({
	message: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: Number,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  }
}, { versionKey: false, timestamps: true })

const cronLogsModel = mongoose.model("cronLogsModel", cronLogsSchema, 'electity_cronLogs')

export default cronLogsModel