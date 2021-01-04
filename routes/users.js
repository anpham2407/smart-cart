var express = require('express');
var router = express.Router();

import * as UserService from '../services/user';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* GET user by UID */
router.get('/:identifier', async (req, res, next) => {
  try {
    const { identifier } = req.params;

    // UID = unique ID - generated when we write a new Card for customer
    // from this UID, we can find coresponding profile
    // then redirect them to /username link
    const user = await UserService.getUser(identifier);
    res.json(user);
  } catch (error) {
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
    next(error);
  }
});

module.exports = router;
