import { Request, Response } from 'express';

import User from '../models/user';
import Book from '../models/book';
import Category from '../models/category';
import Author from '../models/author';
import moment from 'moment';
import { startOfDay, endOfDay } from 'date-fns';

class DashController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.countDocuments();
      const books = await Book.countDocuments();
      const categories = await Category.countDocuments();
      const authors = await Author.countDocuments();

      const dates = [];
      const date = new Date();

      for (var i = 0; i < 7; i++){
        var tempDate = new Date();
        tempDate.setDate(date.getDate() - i);
        const start = startOfDay(tempDate);
        const end = endOfDay(tempDate);

        const booksByDay = await Book.countDocuments({
          createdAt: {
            $gte: start,
            $lte: end,
          }
        });

        dates.push({ date: start, users: booksByDay });
      }

      return res.json({
        users,
        books,
        categories,
        authors,
        bookLastWeek: dates,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new DashController();
