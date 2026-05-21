import express from 'express';

import {
  readUsers,
  createUser,
} from '../services/usersService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await readUsers();

  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await createUser(req.body);

  res.status(201).json(user);
});

export default router;
