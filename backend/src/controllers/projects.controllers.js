import { Project } from '../models/Project.js'
import { Task } from '../models/Task.js';

export async function getProjects(request, response) {
    try {
        const projects = await Project.findAll();
        response.json(projects);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export async function getProject(request, response) {
    try {
        const { id } = request.params;

        const project = await Project.findOne({
            where: {
                id
            }
        });

        if (!project) return response.status(404).json({ message: "Project doesn't exist" })

        response.json(project)
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export async function createProject(request, response) {
    try {
        const { name, priority, description } = request.body;

        const newProject = await Project.create({
            name,
            priority,
            description
        });

        response.json(newProject)
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export async function updateProject(request, response) {
    try {
        const { id } = request.params;
        const { name, priority, description } = request.body;

        const project = await Project.findByPk(id); /* encuentra el project por primary key */
        project.name = name;
        project.priority = priority;
        project.description = description;

        console.log(project)

        await project.save();

        response.json(project);
    } catch (error) {
        return response.status(500).json({ message: error.message }) /* 500 error interno del server */
    }
}

export async function deleteProject(request, response) {
    try {
        const { id } = request.params;

        await Project.destroy({
            where: {
                id,
            },
        });

        response.sendStatus(204) /* todo va bien */
    } catch (error) {
        return response.status(500).json({ message: error.message }) /* 500 error interno del server */
    }
}

export async function getProjectTask(request, response) {
    try {
        const { id } = request.params;

        const tasks = await Task.findAll({
            where: { projectId: id }
        });
        response.json(tasks)
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}