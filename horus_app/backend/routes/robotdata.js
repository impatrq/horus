const express = require("express")
const router = express.Router()

const RobotDataController = require ("../controllers/RobotDataController")

router.get("/", RobotDataController.index)
router.post("/show", RobotDataController.show)
router.post("/deleteAll", RobotDataController.destroyAll)

module.exports = router