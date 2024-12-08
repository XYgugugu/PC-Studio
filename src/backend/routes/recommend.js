const express = require('express');
const config = require("../config.json");
const { querySQL } = require("../SQL/sql");

const router = express.Router();

// recommend PC by CPU and GPU keywords
router.get(config.backend['recommend-pc'].url, (req, res) => {
    const userId = req.query.userId;
    const cpu_keyword = req.query.cpu_keyword || '';
    const gpu_keyword = req.query.gpu_keyword || '';
    const budget = req.query.budget || 9999;
    
    const query = `Call RecommendPCCPUGPU(?, ?, ?, ?)`;
    const params = [userId, cpu_keyword, gpu_keyword, budget];

    querySQL(query, null, (err, result) => {
        if (err) {
            console.log(`Error finding suitable PC: ${err} `);
            return res.status(500).json({
                success: false,
                message: err
            });
        }
        return res.status(200).json({
            success: true,
            data: result
        })
    }, params);

});

module.exports = router;