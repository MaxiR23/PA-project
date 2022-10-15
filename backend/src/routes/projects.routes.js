import { Router } from "express";
import { createProject, deleteProject, getProject, getProjects, getProjectTask, updateProject } from '../controllers/projects.controllers.js'

const router = Router();

router.get('/', getProjects)
router.post('/', createProject)
router.put('/:id', updateProject)
/* un solo proyecto */
router.delete('/:id', deleteProject)
router.get('/:id', getProject)

/* de todos los proyectos solo quiero un proyecto, y de ese proyecto quiero todas sus tareas */
router.get('/:id/tasks', getProjectTask)

export default router;