import express from "express"
import { addPlatform, deletePlatform, getPlatform, getPlatforms, pullCar, pushCar, updatePlatform } from "../controllers/platformController.js"
import { catchErrors } from "../helpers.js"

const router = express.Router()

router.get("/", catchErrors(getPlatforms))

router.get("/:id", catchErrors(getPlatform))

router.post("/", catchErrors(addPlatform))

router.patch("/:id", catchErrors(updatePlatform))

router.delete("/:id", catchErrors(deletePlatform))

router.patch("/car/:id", catchErrors(pushCar))

router.delete("/car/:id", catchErrors(pullCar))

export default router