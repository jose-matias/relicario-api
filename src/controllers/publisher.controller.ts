import { Request, Response } from 'express';
import Publisher from '../models/publisher';

class PublisherController {
  async index(req: Request, res: Response) {
    try {
      const publisher = await Publisher.find();

      if (!publisher) {
        return res.status(404).json({ error: 'Publisher not found' });
      }

      return res.json(publisher);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (await Publisher.findOne({ name })) {
        return res.status(400).json({ error: 'Publisher already exists' });
      }

      const publisher = await Publisher.create(req.body);

      return res.json(publisher);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const publisher = await Publisher.findById(req.params.id);

      if (!publisher) {
        return res.status(404).json({ error: 'Publisher not found' });
      }

      return res.json(publisher);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(publisher);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const publisher = await Publisher.findByIdAndRemove(req.params.id);

      if (!publisher) {
        return res.status(404).json({ message: 'Publisher not found' });
      }

      return res.json({ message: 'Publisher successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new PublisherController();
