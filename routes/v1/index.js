const express = require("express");
const {
    DataController
} = require("../../controllers/index");
const { validateRecord } = require("../../middleware/schemaValidation");

const router = express.Router();

router.post("/add", validateRecord, DataController.addRecord);
router.delete("/delete/:name/:dpt", DataController.deleteRecord);
router.get("/allStat", DataController.getAllSS);
router.get("/allStatOnContract", DataController.getAllSSonContract);
router.get("/allStatOnDept", DataController.getAllStatonDept)
router.get("/allStatOnDeptSubdept", DataController.getAllStatonDeptSubDept)
module.exports = router;