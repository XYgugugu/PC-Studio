const express = require('express');
const config = require("../config.json");
const { querySQL, querySQLAsync } = require("../SQL/sql");

const router = express.Router();

router.put(config.backend['update-pc'].url, async (req, res) => {
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

    const params = [pcId, userId, CPU, CPU_Price, CPU_Cooler, CPU_Cooler_Price, GPU, GPU_Price, Motherboard, Motherboard_Price, Powersupply, Powersupply_Price, RAM, RAM_Price, Storage, Storage_Price];
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
});

module.exports = router;