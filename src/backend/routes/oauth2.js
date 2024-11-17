const express = require('express');
const config = require("../../config.json");
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

// instance to verify credential
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// verify credential
router.post(config.backend['verify-google-token'].url, async (req, res) => {
    const credential = req.body.credential;

    if (!credential) {
        return res.status(400).json({
            success: false,
            message: "Empty credential",
            user: null
        })
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        //@TODO：update user to database

        return res.status(200).json({
            success: true,
            message: "Succeed",
            user: {
                userId: userId,
                email: payload['email'],
                name: payload['name'],
                profile: payload['picture']
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to verify",
            user: null
        });
    }

});

module.exports = router;