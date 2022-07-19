
const express = require("express");
const app = (module.exports = express());

const {
    allowCrossDomain,
    validateRequest,
    jwtRequired,
    passUserFromJWT,
    adminRequired
} = require("../../middlewares");

const multer = require("multer");
const { ErrorHandler } = require("../../utils/error");
const uploadFile = require("../aws/uploadFile");
const upload = multer();
const uploadMiddleware = upload.fields([
    { name: 'image', maxCount: 1 },
])

app.post("/files/upload", [
    uploadMiddleware
], (req, res) => {
    let image;
    try {
        image = req.files.image[0];
    } catch(err) {
        const errors = [ "image binary is required" ] 
        throw new ErrorHandler(403, "Validation Error", errors)
    }
    uploadFile(image, url => {
        return res.json({
            code: 200,
            success: 1,
            file: { url }
        })
    })
})