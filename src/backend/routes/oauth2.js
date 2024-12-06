const express = require('express');
const config = require("../config.json");
const { OAuth2Client } = require('google-auth-library');
const querySQL = require('../SQL/sql');

const router = express.Router();

// instance to verify credential
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// register incoming user (if new)
function register_user(userId, userName, userEmail) {
    const query = `
        INSERT INTO User (user_id, name, email)
        SELECT ?, ?, ?
        WHERE NOT EXISTS (
            SELECT 1
            FROM User
            WHERE user_id = ${userId}
        )
    `;
    const params = [userId, userName, userEmail, userId];

    querySQL(query, null, (err, res) => {
        if (err) {
            console.error(`Error registering user: ${err}`);
        }
        console.log(`User registered`);
    }, params);
}
// check user admin status
function adminStatus(user_id, callback){
    const query = `
        SELECT admin
        FROM User
        WHERE user_id = ?
    `;
    return new Promise((resolve, reject) => {
        querySQL(query, null, (err, res) => {
            if (err) {
                console.log(`Error checking admin status for user ${user_id}`);
                return reject(err);
            }
            if (res.length > 0) {
                resolve(res[0].admin || 0);
            } else {
                resolve(0);
            }
        }, [user_id]);
    });
}
// verify credential
router.post(config.backend['verify-google-token'].url, async (req, res) => {
    const credential = req.body.credential;

    if (!credential) {
        console.error('Empty credential');
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
        const userEmail = payload['email'];
        const userName = payload['name'];
        const userProfile = payload['picture'];
        console.log(`User authorized`);

        register_user(userId, userName, userEmail);

        const isAdmin = await adminStatus(userId);
        console.log(`Admin status: ${isAdmin}`);

        return res.status(200).json({
            success: true,
            message: "Succeed",
            user: {
                userId: userId,
                email: userEmail,
                name: userName,
                profile: userProfile,
                admin: isAdmin
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