const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// ─── /api/notes ───────────────────────────────────────────────────────────────
router.route("/").get(getAllNotes).post(createNote);

// ─── /api/notes/:id ───────────────────────────────────────────────────────────
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
