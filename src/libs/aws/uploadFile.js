const S3_BUCKET = require("./index");
const { v1: uuid } = require('uuid')

module.exports = async (file, callback) => {
    let key = `${uuid()}-${file.originalname}`;
    let data = {
        Bucket: process.env.S3_BUCKET, //"uxstories",
        Key: key, // file from form
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentEncoding: file.encoding,
        ACL: "public-read"
    };
    await S3_BUCKET.upload(data, () => { 
        if (process.env.DEBUG)
            console.log(`https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`)
        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`
        callback(url);
    })
}