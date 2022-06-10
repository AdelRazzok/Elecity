import express from "express"
import { addPlatform, getPlatform, getPlatforms } from "../controllers/platformController"
import { catchErrors } from "../helpers"

const router = express.Router()

router.get("/", catchErrors(getPlatforms))

router.get("/:id", catchErrors(getPlatform))

router.post("/", catchErrors(addPlatform))