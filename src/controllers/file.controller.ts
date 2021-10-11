import { Request, Response } from 'express';

class FileController {
  async upload(req: Request, res: Response) {
    try {
      const { file } = req;

      return res.json({ filename: file?.filename });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // async update(req: Request, res: Response) {
  //   try {
  //     const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

  //     return res.json(book);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }

  // async delete(req: Request, res: Response) {
  //   try {
  //     await Book.findByIdAndRemove(req.params.id);

  //     return res.json({ message: 'Book successfully removed' });
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }
}

export default new FileController();
