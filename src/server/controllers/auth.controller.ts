
import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { email, password, fullName } = req.body;
      const user = await User.create({ email, password, fullName });

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },
};
