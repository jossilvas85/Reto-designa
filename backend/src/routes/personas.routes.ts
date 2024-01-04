import { Router, Request, Response } from 'express';
import { findPersonas, insertPersona } from '../controllers/personas.controller';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  findPersonas(req, res);
});

router.get('/:name', async (req: Request, res: Response) => {
  findPersonas(req, res);
});

router.post('/', async (req: Request, res: Response) => {
  insertPersona(req, res);
});

export default router;
