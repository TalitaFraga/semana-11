const express = require("express")
const router = express.Router()
const controller = require ("../controllers/musicasController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.get("/artists/:artists", controller.getByArtists)
router.get("/year/:launchYear", controller.getByYear)
router.post("/", controller.postMusicas)
router.delete("/:id", controller.deleteMusicas)
router.put("/:id", controller.putMusicas)
router.patch("/:id", controller.patchMusicasStatus)

module.exports = router