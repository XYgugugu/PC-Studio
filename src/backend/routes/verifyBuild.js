const express = require('express');
const config = require("../config.json");
const { querySQL, querySQLAsync } = require("../SQL/sql");

const router = express.Router();

router.put(config.backend['verify-pc'].url, async (req, res) => {
    const CPU = req.query.CPU;
    const GPU = req.query.GPU;
    const CPU_Cooler = req.query.CPU_Cooler;
    const Motherboard = req.query.Motherboard;
    const Powersupply = req.query.Powersupply;
    const RAM = req.query.RAM;
    const Storage = req.query.Storage;

    const CPU_Price = req.query.CPU_Price;
    const GPU_Price = req.query.GPU_Price;
    const CPU_Cooler_Price = req.query.CPU_Cooler_Price;
    const Motherboard_Price = req.query.Motherboard_Price;
    const Powersupply_Price = req.query.Powersupply_Price;
    const RAM_Price = req.query.RAM_Price;
    const Storage_Price = req.query.Storage_Price;

    const userId = req.query.userId;
    const pcId = req.query.pcId;
    const operationMode = req.query.operationMode;


    if (operationMode !== null && operationMode !== undefined) {
        const params = [pcId, userId, CPU, CPU_Price, CPU_Cooler, CPU_Cooler_Price, GPU, GPU_Price, Motherboard, Motherboard_Price, Powersupply, Powersupply_Price, RAM, RAM_Price, Storage, Storage_Price, operationMode === 'create' ? 0 : 1];
        const query = `Call CreateUpdatePC(${Array(params.length).fill('?').join(', ')})`;        
        
        querySQL(query, null, (err, result) => {
            if (err) {
                console.error(`Error updating/creating PC: ${err}`);
                return res.status(500).json({
                    success: false,
                    message: `Error updating/creating PC: ${err}`
                });
            }
            return res.status(200).json({
                success: true
            })
        }, params);
    }

    // verify design ONLY
    const params1 = [CPU, CPU_Cooler, GPU, Motherboard, Powersupply, RAM, Storage];
    const query1 = `Call CheckCompatibility(${Array(params1.length).fill('?').join(', ')})`;

    const params2 = [CPU, CPU_Price, CPU_Cooler, CPU_Cooler_Price, GPU, GPU_Price, Motherboard, Motherboard_Price, Powersupply, Powersupply_Price, RAM, RAM_Price, Storage, Storage_Price];
    const query2 = `Call CheckPriceChange(${Array(params2.length).fill('?').join(', ')})`;

    try {
        const resultCompatibility = await querySQLAsync(query1, params1);
        const isCompatible = resultCompatibility[0]?.[0]?.compatible_flag;
        console.log(`Compatibility result: ${isCompatible}`);
        if (!compatibility) {
            return res.status(200).json({
                success: false,
                message: "Components are not compatible"
            });
        }

        const resultPriceStatus = await querySQLAsync(query2, params2);
        const isPriceValid = resultPriceStatus[0]?.[0]?.valid_flag;
        console.log(`Price status: ${isPriceValid}`);
        if (!isPriceValid) {
            return res.status(200).json({
                success: false,
                message: "Price has been changed"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Design Verified"
        });
    } catch (err) {
        console.error(`Error during verification: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Error during verification"
        });
    }
});

module.exports = router;