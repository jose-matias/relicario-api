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
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ menssage: 'The user already exists' });
      }

      const newUser = new User(req.body);
      await newUser.save();

      return res.json({
        user: newUser,
        access_token: createToken(newUser),
      });
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
        access_token: createToken(user),
      });
    }

    return res.status(400).json({ menssage: 'Email or password incorrect' });
  }

  async singInWithGoogle(req: Request, res: Response) {
    const { name, email, providerId } = req.body;

    const userExists = await User.findOne({ providerId });

    if (userExists) {
      return res.json({
        user: userExists,
        access_token: createToken(userExists),
      });
    }

    const newUser = await User.create({
      name,
      email,
      provider: 'google',
      providerId,
      password: providerId,
    });

    return res.json({
      user: newUser,
      access_token: createToken(newUser),
    });
  }
};

export default new AuthController();
