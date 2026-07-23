const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, addTask);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;