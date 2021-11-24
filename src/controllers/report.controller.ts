import { Request, Response } from 'express'
import moment from 'moment'
import JSReport from '../requests/jsreport'
import User from '../models/user'
import Book from '../models/book';

class ReportController {
  async users(req: Request, res: Response) {
    try {
      const users = await User.find().select(['-password']);
      const response: any = await JSReport.render('k_lfmZF', { users });

      if (response.status !== 200) {
        return res.status(400).send({
          message: 'Error when generating the report',
        });
      }

      const today = moment().format('DDMMYYYYHHmm');
      const filename = `RELATORIO-USUARIOS-${today}.PDF`;

      res.setHeader('Content-disposition', `inline; filename=${filename}`);
      res.setHeader('Content-type', 'application/pdf');

      return res.send(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async books(req: Request, res: Response) {
    try {
      const books: any = await Book.find()
        .populate({ path: '_author', select: 'name about' })
        .populate({ path: '_publisher', select: 'name site' });

      const data = books.map((book: any) => {
        return {
          name: book.name,
          author: book._author.name,
          publisher: book._publisher.name,
          quantity: book.quantity,
        }
      });

      const response: any = await JSReport.render('6U1mmkI', { books: data });

      if (response.status !== 200) {
        return res.status(400).send({
          message: 'Error when generating the report',
        });
      }

      const today = moment().format('DDMMYYYYHHmm');
      const filename = `RELATORIO-LIVROS-${today}.PDF`;

      res.setHeader('Content-disposition', `inline; filename=${filename}`);
      res.setHeader('Content-type', 'application/pdf');

      return res.send(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new ReportController();
