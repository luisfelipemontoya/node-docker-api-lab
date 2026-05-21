import express from 'express';

import usersRoutes from './routes/users.js';
import { logger } from './middlewares/logger.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
  res.json({
    message: 'Express funcionando 🚀',
  });
});

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
