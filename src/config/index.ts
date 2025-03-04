import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.PORT ?? 3001),
  jwtSecret: process.env.JWT_SECRET
}
