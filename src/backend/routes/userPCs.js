const express = require('express');
const config = require("../config.json");
const querySQL = require("../SQL/sql");

const router = express.Router();

// get all PCs customized by requesting user
router.get(config.backend['user-pc'].url, (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        console.log(`Unexpected user id received: ${userId}`);
        return res.status(400).json({
            success: false,
            message: "Invalid/Missing userId"
        });
    }
    const query = `
        SELECT *
        FROM PC
        WHERE owner = ?
    `;
    const params = [userId]
    querySQL(query, null, (err, result) => {
        if (err) {
            console.log(`Error querying user PC: ${err}`);
            return res.status(500).json({
                success: false,
                message: "Invalid SQL query for user PC"
            });
        }
        return res.status(200).json({
            success: true,
            data: result
        })
    }, params);
});

// delete certain PC(s) per request
router.delete(config.backend['user-pc'].url, (req, res) => {
    const userId = req.query.userId;
    const pcIds = req.query.pcIds;
    if (!userId || !pcIds) {
        console.log(`Missing userId/pcIds: userId=${userId}, pcIds=${pcIds}`);
        return res.status(400).json({
            success: false,
            message: "Invalid/Missing userId/pcIds"
        });
    }

    const pcIdList = Array.isArray(pcIds) ? pcIds : [pcIds];
    const idBuffer = pcIdList.map(() => '?').join(',');
    const query = `
        DELETE FROM PC
        WHERE owner = ? AND PC_ID IN (${idBuffer})
    `;
    const params = [userId, ...pcIdList];
    querySQL(query, null, (err, result) => {
        if (err) {
            console.log(`Error deleting PC entries: ${err}`);
            return res.status(500).json({
                success: false,
                message: "Failed to delete PCs"
            });
        }
        return res.status(200).json({
            success: true
        });
    }, params);
});

module.exports = router;