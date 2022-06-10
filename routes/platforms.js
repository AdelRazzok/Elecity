import express from "express"
import { addPlatform, getPlatform, getPlatforms } from "../controllers/platformController.js"
import { catchErrors } from "../helpers.js"

const router = express.Router()

router.get("/", catchErrors(getPlatforms))

router.get("/:id", catchErrors(getPlatform))

router.post("/", catchErrors(addPlatform))

export default router