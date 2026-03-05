const Note = require("../models/Note");

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getAllNotes = async (req, res, next) => {
  try {
    const { category, isPinned, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isPinned !== undefined) filter.isPinned = isPinned === "true";
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter).sort({ isPinned: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error(`Note not found with id: ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const createNote = async (req, res, next) => {
  try {
    const { title, content, category, isPinned, tags } = req.body;

    if (!title || !content) {
      res.status(400);
      throw new Error("Title and content are required");
    }

    const note = await Note.create({ title, content, category, isPinned, tags });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update a note by ID
// @route   PUT /api/notes/:id
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const updateNote = async (req, res, next) => {
  try {
    const { title, content, category, isPinned, tags } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error(`Note not found with id: ${req.params.id}`);
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category, isPinned, tags },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete a note by ID
// @route   DELETE /api/notes/:id
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error(`Note not found with id: ${req.params.id}`);
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
