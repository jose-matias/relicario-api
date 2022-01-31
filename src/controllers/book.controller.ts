import { Request, Response } from 'express';
import Book from '../models/book';

class BookController {
  async index(req: Request, res: Response) {
    try {
      const books = await Book.find()
        .populate({ path: '_author', select: 'name about' })
        .populate({ path: '_category', select: 'name about' })
        .populate({ path: '_publisher', select: 'name site' });

      if (!books) {
        return res.status(404).json({ message: 'Books not found' });
      }

      return res.json(books);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const book = await Book.create(req.body);

      return res.json(book);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const book: any = await Book.findById(req.params.id)
        .populate({ path: '_author', select: 'name about' })
        .populate({ path: '_category', select: 'name about' })
        .populate({ path: '_publisher', select: 'name site' });

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      book.cover = book.cover;

      return res.json(book);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(book);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async upload(req: Request, res: Response) {
    try {
      return res.json({ message: 'Cover upload file successfully' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const book = await Book.findByIdAndRemove(req.params.id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      return res.json({ message: 'Book successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new BookController();
