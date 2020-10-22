const express = require("express")
const router = express.Router()
const controller = require ("../controllers/musicasController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.postMusicas)
router.delete("/:id", controller.deleteMusicas)

module.exports = router