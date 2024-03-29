import { Request, Response } from 'express';

import User from '../models/user';
import Book from '../models/book';
import Author from '../models/author';
import Category from '../models/category';
import Publisher from '../models/publisher';
import Suggestion from '../models/suggestion';
import Reserve from '../models/reserve';

class DashController {
  async index(req: Request, res: Response) {
    try {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const activeUsers = await User.countDocuments({ status: true });
      const books = await Book.countDocuments();
      const authors = await Author.countDocuments();
      const categories = await Category.countDocuments();
      const publishers = await Publisher.countDocuments();
      const suggestions = await Suggestion.countDocuments();
      const reserves = await Reserve.countDocuments();

      const inactiveUsers = await User.countDocuments({ status: false });
      const suggestionReview = await Suggestion.countDocuments({ status: true });
      const reservedBooks = await Reserve.countDocuments({ status: 'Reservado', updatedAt: { $gte: startOfToday } });
      const borrowedBooks = await Reserve.countDocuments({ status: 'Emprestado', updatedAt: { $gte: startOfToday } });

      return res.json({
        dataGraph: [
          {
            label: 'Usuários',
            value: activeUsers,
          },
          {
            label: 'Livros',
            value: books,
          },
          {
            label: 'Autores',
            value: authors,
          },
          {
            label: 'Categorias',
            value: categories,
          },
          {
            label: 'Editoras',
            value: publishers,
          },
          {
            label: 'Sugestões',
            value: suggestions,
          },
          {
            label: 'Reservas',
            value: reserves,
          }
        ],
        inactiveUsers,
        suggestionReview,
        reservedBooks,
        borrowedBooks,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new DashController();
