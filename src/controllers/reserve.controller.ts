import { Request, Response } from 'express';
import Reserve from '../models/reserve';
import Book from '../models/book';

class ReserveController {
  async index(req: Request, res: Response) {
    try {
      const filter: any = {};

      if (req.query.user) {
        filter._user = req.query.user;
      }

      const reserve = await Reserve.find(filter)
        .populate({ path: '_user' })
        .populate({
          path: '_book',
          select: 'name _author',
          populate: { path: '_author', select: 'name' },
        });

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
      const { _book }: any = req.body;

      const book = await Book.findById(_book);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const countBooks = await Reserve.countDocuments({
        _book,
        status: { $in: ['Reservado', 'Emprestado'] },
      });

      if (book.quantity === countBooks) {
        await Book.updateOne(_book, {
          $set: { status: false }
        });

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
      const reserve = await Reserve.findById(req.params.id)
        .populate({ path: '_user' })
        .populate({
          path: '_book',
          select: 'name _author',
          populate: { path: '_author', select: 'name' },
        });

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

  async patch(req: Request, res: Response) {
    try {
      const reserve = await Reserve.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true });

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
