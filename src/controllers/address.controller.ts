import { Request, Response } from 'express';
import Address from '../models/address';

class AddressController {
  async index(req: Request, res: Response) {
    try {
      const addresss = await Address.find();

      if (!addresss) {
        return res.status(404).json({ error: 'Addresss not found' });
      }

      return res.json(addresss);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { _id } = req.body;

      if (await Address.findById(_id)) {
        return res.status(400).json({ error: 'Address already exists' });
      }

      const address = await Address.create(req.body);

      return res.json(address);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const address = await Address.findById(req.params.id);

      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }

      return res.json(address);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.json(address);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const address = await Address.findByIdAndRemove(req.params.id);

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      return res.json({ message: 'Address successfully removed' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new AddressController();
