import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.find();

      if (!users) {
        return res.status(404).json({ error: 'Users not found' });
      }

      return res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndRemove(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'User successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;

      const user = await User.findById(req.params.id);

      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const passwordHash = hash;

        await User.findByIdAndUpdate(user._id, { $set: { password: passwordHash } });
      }

      return res.json({ menssage: 'Password changed with successfuly' });
    } catch (error) {

    }
  }
}

export default new UserController();
