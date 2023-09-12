import { User } from '@prisma/client';
import { createServer } from './server';

const port = process.env.PORT || 3000;
const server = createServer();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
