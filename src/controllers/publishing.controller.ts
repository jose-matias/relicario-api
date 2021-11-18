import { Request, Response } from 'express';
import Publishing from '../models/publishing';

class PublishingController {
  async index(req: Request, res: Response) {
    try {
      const publishing = await Publishing.find();

      if (!publishing) {
        return res.status(404).json({ error: 'publishing not found' });
      }

      return res.json(publishing);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (await Publishing.findOne({ name })) {
        return res.status(400).json({ error: 'Publishing already exists' });
      }

      const publishing = await Publishing.create(req.body);

      return res.json(publishing);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const publishing = await Publishing.findById(req.params.id);

      if (!publishing) {
        return res.status(404).json({ error: 'Publishing not found' });
      }

      return res.json(publishing);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const publishing = await Publishing.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(publishing);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const publishing = await Publishing.findByIdAndRemove(req.params.id);

      if (!publishing) {
        return res.status(404).json({ message: 'Publishing not found' });
      }

      return res.json({ message: 'Publishing successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new PublishingController();
