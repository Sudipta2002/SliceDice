const express = require("express");
const {
    DataController,
    UserController
} = require("../../controllers/index");
const { validateRecord, validateUserSchema } = require("../../middleware/schemaValidation");
const { isAuthenticated } = require("../../controllers/userController");

const router = express.Router();

//Stats
router.post("/add", validateRecord, isAuthenticated, DataController.addRecord);
router.delete("/delete/:name/:dpt", isAuthenticated, DataController.deleteRecord);
router.get("/allStat", isAuthenticated, DataController.getAllSS);
router.get("/allStatOnContract", isAuthenticated, DataController.getAllSSonContract);
router.get("/allStatOnDept", isAuthenticated, DataController.getAllStatonDept)
router.get("/allStatOnDeptSubdept", isAuthenticated, DataController.getAllStatonDeptSubDept)

// User
router.post('/createUser', validateUserSchema, UserController.create);
router.post('/signin', validateUserSchema, UserController.signIn);
router.post('/auth', UserController.isAuthenticated);
module.exports = router;