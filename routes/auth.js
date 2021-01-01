import express from 'express';
import * as UserService from '../services/user';

const router = express.Router();

// /* POST new user */
router.post('/activate', async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await UserService.create(payload);
    res.json(user);
  } catch (error) {
    console.error('error', error);
    next(error);
  }
});

module.exports = router;
