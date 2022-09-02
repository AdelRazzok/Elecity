import express from 'express'
import { updateUserDocument, deleteUserDocument } from '../controllers/userController.js'
import { updateOfferImage } from '../controllers/offerController.js'
import { catchErrors } from '../helpers.js'
import multer from 'multer'

const upload = multer()

const router = express.Router()

/* ========== Admin Routes ========== */

/* ==== User ==== */

// @route   PATCH api/v1/files/user/:id
// @desc    Upload a file to a user by updating the user's id_card or driver_license
// @access  Private
router.patch('/user/:id', upload.single('user_document'), catchErrors(updateUserDocument))

// @route   DELETE api/v1/files/user/:id
// @desc    Delete a file from a user by updating the user's id_card or driver_license
// @access  Private
router.delete('/user/:id', catchErrors(deleteUserDocument))

/* ==== Offer ==== */

// @route   PATCH api/v1/files/offer/:id
// @desc    Upload a file to an offer by updating one of the offer's images
// @access  Private
router.patch('/offer/:id', upload.single('offer_image'), catchErrors(updateOfferImage))

export default router