const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        // console.log(req.body);

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            })
        }

        const task = await Task.create({
            title, description, status, priority, dueDate, user: req.user._id
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}    


const getAllTask = async(req,res) => {
    try{
        const tasks = await Task.find({
            user:req.user._id
        }).sort({createdAt: -1});

        return res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}


const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const updates = {};

        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;
        if (priority !== undefined) updates.priority = priority;
        if (dueDate !== undefined) updates.dueDate = dueDate;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        if (updates.title !== undefined && !updates.title.trim()) {
            return res.status(400).json({
                message: "Task title cannot be empty"
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {createTask,getAllTask,getSingleTask,updateTask,deleteTask};