const express = require('express');
const config = require("../../config.json");
const querySQL = require("../SQL/sql");

const router = express.Router();

const components = ['CPU', 'CPU_Cooler', 'GPU', 'Motherboard', 'PowerSupply', 'RAM', 'Storage'];

router.get(config.backend['item-gallery'].url, (req, res) => {
    const component = req.query.component;
    // constrains on query component: must be one of the valid components
    if (!component || !components.includes(component)) {
        return res.status(400).json({
            success: false,
            message: "Invalid component type",
            data: null
        })
    }
    const query = `
        SELECT *
        FROM ${component}
    `;
    querySQL(query, null, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Invalid SQL query"
            });
        }
        console.log(result);
        return res.status(200).json({
            success: true,
            data: result
        });
    });
});

module.exports = router;