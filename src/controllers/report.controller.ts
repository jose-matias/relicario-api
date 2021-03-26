import { Request, Response } from 'express'
import moment from 'moment'
import JSReport from '../requests/jsreport'
import User from '../models/user'

class ReportController {
  async users(req: Request, res: Response) {
    try {
      const users = await User.find().select(['-password']);
      const response = await JSReport.render('k_lfmZF', { users });

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
}

export default new ReportController();
