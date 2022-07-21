
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
const { createMedia } = require("../medias-api/medias-dal");
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
    const {
        fieldname: fieldName, originalname: originalName,
        encoding, mimetype,
        size, destination,
        filename, path
    } = image;
    
    const fileProperties = {
        fieldName, originalName,
        encoding, mimetype,
        size, destination,
        filename, path
    }
    // return res.json(JSON.stringify(image))
    uploadFile(image, async media_url => {
        const data = Object.assign(fileProperties, { media_url, BlogId: req.BlogId } );
        console.log(data)
        try {
            const media = await createMedia(data)
            return res.json({
                code: 200,
                success: 1,
                file: { url: media_url },
                data: { media }
            })
        } catch(err) {
            return res.status(500).json(new ErrorHandler(500, "Bad Request", [ ]))
        }
    })
})