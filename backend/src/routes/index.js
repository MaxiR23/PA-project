import express  from "express";
import usersRouter from "../routes/users.routes.js"
import projectsRouter from "../routes/projects.routes.js"
import taskRouter from "../routes/tasks.routes.js"

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', taskRouter);

export default router