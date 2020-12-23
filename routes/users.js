var express = require('express');
var router = express.Router();

import * as UserService from '../services/user';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('error', error);
    next(error);
  }
});

/* GET user by username */
router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await UserService.getByUsername(username);
    res.json(user);
  } catch (error) {
    console.error('error', error);
    next(error);
  }
});

/* POST new user */
router.post('/', async (req, res, next) => {
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
