const express = require("express");
const router = express.Router();

const song_controller = require("../controllers/songController");

// POST request for creating Song.
router.post("/", song_controller.song_create);

// DELETE request to delete Song.
router.delete("/:id", song_controller.song_delete);

// PUT request to update Song.
router.put("/:id", song_controller.song_update);

// GET request for one Song.
router.get("/:id", song_controller.song_detail);

// GET request for list of all Song items.
router.get("/", song_controller.song_list);

module.exports = router;