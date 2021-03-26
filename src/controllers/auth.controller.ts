import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser) {
  const expiryTime = { expiresIn: 86400 };
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, expiryTime);
};

class AuthController {
  async singUp(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ menssage: 'Email or password incorrect' });
      }

      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ menssage: 'The user already exists' });
      }

      const newUser = new User(req.body);
      await newUser.save();

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async singIn(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ menssage: 'Email or password incorrect' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ menssage: 'The user does not exists' });
    }

    const isMatch = await user.comparePasswords(req.body.password);

    if (isMatch) {
      return res.json({
        user,
        token: createToken(user),
      });
    }

    return res.status(400).json({ menssage: 'Email or password incorrect' });
  }

  async google(req: Request, res: Response) {
    const user: any = req.user;

    return res.json({
      user,
      token: createToken(user),
    });
  }

  async facebook(req: Request, res: Response) {
    const user: any = req.user;

    return res.json({
      user,
      token: createToken(user),
    });
  }
};

export default new AuthController();
