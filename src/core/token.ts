import * as jwt from 'jsonwebtoken';

import { User } from '../users/user.interface';
import config from '../config';

interface userId {
  data: string
};

export function generateToken(user: User): string {
  const payload: userId = {
    data: user._id
  };

  const token: string = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

  return token;
}

export function verifyToken(token: string): string {
  const data: string = jwt.verify(token, config.jwtSecret);

  return data;
}
