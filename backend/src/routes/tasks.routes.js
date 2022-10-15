import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/tasks.controller.js'

const router = Router();

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.get('/:id', getTask)

export default router;