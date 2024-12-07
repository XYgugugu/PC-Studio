const express = require('express');
const config = require("../config.json");
const { querySQL } = require("../SQL/sql");

const router = express.Router();

// modify certain item price for admin ONLY
router.put(config.backend['admin-modify-price'].url, (req, res) => {
    const userId = req.query.userId;
    const componentType = req.query.componentType;
    const itemName = req.query.itemName;
    const updatedPrice = req.query.price;
    const forceOverride = req.query.forceOverride || false;
    // verify admin (placeholder for later)
    
    // update
    const procedure = getStoredProcedure(componentType);
    if (!procedure) {
        console.log(`Invalid component type: ${componentType}`);
        return res.status(400).json({
            success: false,
            message: "Invalid componentType"
        });
    }
    const query = [
        `Call ${procedure}(?, ?, ?, @status);`,
        `SELECT @status AS status;`];

    const params = [[itemName, updatedPrice, forceOverride], []];

    querySQL(query, null, (err, result) => {
        if (err) {
            console.log(`Error executing procedure: ${err}`);
            return res.status(500).json({
                success:false,
                message: "Error executing procedure"
            });
        }

        const status = result[1][0].status;
        console.log(`Execution status on ${componentType}-${itemName} update price (${updatedPrice}) procedure: ${status}`);
        if (status) {
            return res.status(200).json({
                success: true
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Failed due to invalid price rejected by constrains"
            })
        }
    }, params);
});

function getStoredProcedure(componentType) {
    switch (componentType) {
        case 'CPU': return 'AdminUpdatePriceCPU';
        case 'CPUCooler': return 'AdminUpdatePriceCPUCooler';
        case 'GPU': return 'AdminUpdatePriceGPU';
        case 'Motherboard': return 'AdminUpdatePriceMotherboard';
        case 'Powersupply': return 'AdminUpdatePricePowersupply';
        case 'RAM': return 'AdminUpdatePriceRAM';
        case 'Storage': return 'AdminUpdatePriceStorage';
        default: return null;
    }
}

module.exports = router;