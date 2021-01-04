import express from 'express';
import { APIError } from '../core/error';
import * as UserService from '../services/user';
import * as AuthService from '../services/auth';

const router = express.Router();

// auth errors
const ErrInvalidAuthRequest = APIError({
  status: 400,
  code: 'INVALID_AUTH_REQUEST',
  message: 'invalid auth request, missing email/phone/password',
});

router.post('/login', async (req, res, next) => {
  try {
    // validate login request payload
    const { id, password } = req.body;
    if (!(id && password)) {
      return next(ErrInvalidAuthRequest);
    }

    const authReq = {
      id: String(id).trim(),
      password: String(password).trim(),
    };

    const authResp = await AuthService.userLogin(authReq);

    return res.json(authResp);
  } catch (error) {
    return next(error);
  }
});

router.post('/refresh');

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
