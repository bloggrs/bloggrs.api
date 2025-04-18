if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const { 
    allowCrossDomain, 
    jwtNotRequired, 
    validateRequest, 
    passUserOrCreateGuestFromJWT 
} = require("../../middlewares");

const app = module.exports = express();

const { ErrorHandler } = require("../../utils/error")

const createToken = require("../utils/createToken")
const { findUserByPk } = require("../users-dal");
const { post_auth } = require("./validations");

const validateCredentials = require("./validateCredentials");

const getResponse = user => ({
    status: "success",
    code: 200,
    message: "Authorized",
    data: {
        token: createToken(user.id),
        user
    }
})

app.use(allowCrossDomain)

app.get('/auth', [
    jwtNotRequired, passUserOrCreateGuestFromJWT
], async (req, res) => {
    const { user } = req;
    if (!user) throw new ErrorHandler(401, "Unauthorized")
    return res.json(getResponse(user))
});

app.post('/auth', [ validateRequest(post_auth) ] , async (req, res) => {
    console.log(req.body)
    let user = await validateCredentials(req.body)
    return res.json(getResponse(user))
});