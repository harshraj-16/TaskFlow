const express = require("express");
const { route } = require("./authRoutes");
const isAuthenticated = require("../middleware/authMiddleware");
const { createTask, getAllTask, getSingleTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();


router.post("/",isAuthenticated,createTask);
router.get("/",isAuthenticated,getAllTask);
router.get("/:id",isAuthenticated,getSingleTask);
router.patch("/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);

module.exports = router;