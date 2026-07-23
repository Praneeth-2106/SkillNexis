const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content,
            user: req.user.id,
        });

        res.status(201).json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Notes of Logged-in User
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id,
        });

        res.json(notes);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            req.body,
            {
                new: true,
            }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        res.json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {

        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        res.json({
            message: "Note deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
};