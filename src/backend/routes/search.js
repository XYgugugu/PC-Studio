const express = require('express');
const config = require("../config.json");
const { querySQL } = require("../SQL/sql");

const router = express.Router();

router.get(config.backend['keyword-search'].url, (req, res) => {
    const componentType = req.query.componentType;
    const keyword = req.query.keyword;
    const fullFeatureMode = req.query.fullFeatureMode;

    const query = (fullFeatureMode != 0) ? `Call ComponentKeywordSearchFullInfo(?, ?)` : `Call ComponentKeywordSearchPriceOnly(?, ?)`;
    const params = [componentType, keyword];

    querySQL(query, null, (err, result) => {
        if (err) {
            console.log(`Error searching keyword (${keyword}) on ${componentType}`);
            return res.status(500).json({
                success: false,
                message: `Error searching keyword (${keyword}) on ${componentType}`
            });
        }
        return res.status(200).json({
            success: true,
            data: result
        })
    }, params);
});

module.exports = router;