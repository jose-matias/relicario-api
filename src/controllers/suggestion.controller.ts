import { Request, Response } from 'express';
import Suggestion from '../models/suggestion';

class SuggestionController {
  async index(req: Request, res: Response) {
    try {
      const suggestion = await Suggestion.find();

      if (!suggestion) {
        return res.status(404).json({ error: 'Suggestion not found' });
      }

      return res.json(suggestion);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const suggestion = await Suggestion.create(req.body);
      return res.json(suggestion);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const suggestion = await Suggestion.findById(req.params.id);

      if (!suggestion) {
        return res.status(404).json({ error: 'Suggestion not found' });
      }

      return res.json(suggestion);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(suggestion);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const suggestion = await Suggestion.findByIdAndRemove(req.params.id);

      if (!suggestion) {
        return res.status(404).json({ message: 'Suggestion not found' });
      }

      return res.json({ message: 'Suggestion successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new SuggestionController();
