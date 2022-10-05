import ImageKit from 'imagekit'
import QRCode from 'qrcode'
import dotenv from 'dotenv'
dotenv.config()

export const catchErrors = fn => (req, res, next) => {
  return fn(req, res, next).catch(next)
}

export const imageKitSDK = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

export const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}