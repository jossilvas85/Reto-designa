import { Request, Response } from 'express';
import { PersonaModel } from '../config/db.config';
import { Error } from 'mongoose';

export const findPersonas = async (req: Request, res: Response) => {
  try {
    const name = req.params['name'];
    if (!name) {
      const persona = await PersonaModel.find();
      if (!persona)
        return res.status(404).json({ message: 'Usuarios no encontrados' });

      return res.json(persona);
    } else {
      const persona = await PersonaModel.find({ name: name });
      if (!persona || persona.length === 0)
        return res.status(404).json({ message: 'Usuario no encontrado' });

      return res.json(persona);
    }
  } catch (error: any) {
    SendError(error, res);
  }
};

export const insertPersona = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const persona = new PersonaModel(data);
    const personaGuardada = await persona.save();
    return res.status(201).json({ personaGuardada });
  } catch (error: any) {
    SendError(error, res);
  }
};

const SendError = (error: any, res: Response) => {
  if (error instanceof Error && error.message) {
    res.status(500).json({ error: error.message });
  } else {
    // Manejar otros tipos de error aquí si es necesario
    return res.status(500).json({ error: `'Error desconocido: ${error}'` });
  }
};
