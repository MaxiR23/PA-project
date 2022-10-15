import { Task } from '../models/Task.js'

export async function getTasks(request, response) {
    try {
        const tasks = await Task.findAll()
        response.json(tasks);
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function createTask(request, response) {
    try {
        const { name, done, projectId } = request.body;

        const newTask = await Task.create({
            name,
            done,
            projectId,
        })

        response.json(newTask);
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function getTask(request, response) {
    const { id } = request.params;
    try {
        const task = await Task.findOne({
            where: { id },
            attributes: ['name'] /* que campos queremos que retorne la consulta, projecciones */
        })
        response.json(task);
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function updateTask(request, response) {
    try {
        const { id } = request.params;

        const task = await Task.findOne({
            where: { id }
        })
        /* con set selecciona y actualiza solo algunos campos, no necesariamete todos */
        task.set(request.body)

        await task.save();
        return response.json(task)
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function deleteTask(request, response) {
    const { id } = request.params;

    try {
        const result = await Task.destroy({
            where: { id }
        })
        console.log(result)
        return response.send(204)
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}
