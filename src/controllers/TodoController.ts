import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json(list);
}

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201);
        res.json({ item: newTodo });
    } else {
        res.json({ error: 'Dados não enviados.' });
    }
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { title, done } = req.body;
    let todo = await Todo.findByPk(id);
    if (todo) {
        if (title) {
            todo.title = title;
        }
        if (done != todo) {
            todo.done = done;
        }
        await todo.save();
        res.json(todo);
    } else {
        res.json({ error: 'Item não encontrado' });
    }
}

export const remove = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let todo = await Todo.findByPk(id);
    if (todo) {
        await todo.destroy();
    }
    else {
        res.json({ error: "Item não existente" })
    }
    res.json({ message: `Id: ${id} deletado com sucesso` })
}
