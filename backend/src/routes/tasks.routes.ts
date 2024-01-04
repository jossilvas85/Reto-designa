import { Router, Request, Response } from 'express';
import { TaskInterface } from '../interfaces/task.interface';

const router = Router();
let tasks: TaskInterface[] = [];

router.get('/', (req: Request, res: Response) => {
  res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));

  if (!task) {
    res.status(404).send('Coincidence not found');
  } else res.json(task);
});

router.post('/', (req: Request, res: Response) => {
  const task: TaskInterface = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.delete('/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
