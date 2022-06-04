import ImageKit from "imagekit"
import dotenv from "dotenv"
dotenv.config()

export const catchErrors = fn => (req, res, next) => {
    return fn(req, res, next).catch(next)
}

export const imageKitSDK = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})