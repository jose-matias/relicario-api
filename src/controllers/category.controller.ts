import { Request, Response } from 'express';
import Category from '../models/category';

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      const categories = await Category.find();

      if (!categories) {
        return res.status(404).json({ error: 'Categories not found' });
      }

      return res.json(categories);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (await Category.findOne({ name })) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const category = await Category.create(req.body);

      return res.json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const category = await Category.findByIdAndRemove(req.params.id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.json({ message: 'Category successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new CategoryController();
