const express = require('express');
const config = require("../config.json");
const { querySQL } = require("../SQL/sql");

const router = express.Router();

// miscellaneous

// rank manufacturer by product counts

router.get(config.backend['manufacturer-product-count-rank'].url, (req, res) => {
    const query = `Call RankManufacturerByProductCount()`;
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
        });
    }, []);
});