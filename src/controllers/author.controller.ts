import { Request, Response } from 'express';
import Author from '../models/author';

class AuthorController {
  async index(req: Request, res: Response) {
    try {
      const authors = await Author.find();

      if (!authors) {
        return res.status(404).json({ error: 'Authors not found' });
      }

      return res.json(authors);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (await Author.findOne({ name })) {
        return res.status(400).json({ error: 'Author already exists' });
      }

      const author = await Author.create(req.body);

      return res.json(author);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const author = await Author.findById(req.params.id);

      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      return res.json(author);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(author);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const author = await Author.findByIdAndRemove(req.params.id);

      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }

      return res.json({ message: 'Author successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new AuthorController();
