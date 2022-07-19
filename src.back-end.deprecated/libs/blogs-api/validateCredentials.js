const { ErrorHandler } = require("../../utils/error")
const bcrypt = require("bcryptjs")

let { Blog, SecretKey } = require("../../models")

const INVALID_CREDENTIALS_ERROR = new ErrorHandler(400, "Invalid credentials", [
    "blog_id or secret is invalid"
])

module.exports = async ({ blog_id, secret }) => {
    let blog = await Blog.findOne({ where: { id: blog_id } })
    if (!blog) throw INVALID_CREDENTIALS_ERROR
    const secretKeys = await SecretKey.findMany({
        where: { BlogId: blog_id }
    })
    const secrets = secretKeys.map(s => s.id)
    const nosecret_found = !secrets.length
    const lastsecret_correct = secrets[secrets.length - 1] === secret;
    if (nosecret_found || !lastsecret_correct) throw INVALID_CREDENTIALS_ERROR
    
    return blog;
}
