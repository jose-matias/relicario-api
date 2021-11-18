import { Request, Response } from 'express';
import Reserve from '../models/reserve';

class ReserveController {
  async index(req: Request, res: Response) {
    try {
      const filter: any = {};

      if (req.query.user) {
        filter._user = req.query.user;
      }

      const reserve = await Reserve.find(filter);

      if (!reserve) {
        return res.status(404).json({ error: 'Reserve not found' });
      }

      return res.json(reserve);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (await Reserve.findOne({ name })) {
        return res.status(400).json({ error: 'Reserve already exists' });
      }

      const reserve = await Reserve.create(req.body);

      return res.json(reserve);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const reserve = await Reserve.findById(req.params.id);

      if (!reserve) {
        return res.status(404).json({ error: 'Reserve not found' });
      }

      return res.json(reserve);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const reserve = await Reserve.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(reserve);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const reserve = await Reserve.findByIdAndRemove(req.params.id);

      if (!reserve) {
        return res.status(404).json({ message: 'Reserve not found' });
      }

      return res.json({ message: 'Reserve successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new ReserveController();
